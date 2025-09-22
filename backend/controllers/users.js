const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");

exports.signup = (req, res, next) => {
  // Check the email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email))
    return res.status(400).json({ error: "Erreur dans le formulaire" });

  // Check password length
  if (req.body.password.length < 12)
    return res.status(400).json({ error: "Erreur dans le formulaire" });

  // Check password characters
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).+$/;
  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      error:
        "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial",
    });
  }

  if (req.body.password !== req.body.confirmPassword)
    return res
      .status(400)
      .json({ error: "Les mots de passe doivent être identiques" });

  // Password hashing and user creation
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  // Search email in table
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Identifiant/mot de passe incorrect" });
      }

      // Check password
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Identifiant/mot de passe incorrect" });
          } else {
            res.status(200).json({
              user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                panier: user.panier,
                purchases: user.purchases,
                addresses: user.addresses
              },
              // Generate a token for user with secret key for the server to verify that it has not been tampered with
              // TODO Changer le token toutes les X minutes
              token: jwt.sign(
                { userID: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
              ),
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getMe = (req, res) => {
  // Search user and excluding password
  User.findById(req.userId)
    .select("-password")
    .then((user) => {
      if (!user)
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      res.status(200).json(user);
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.addToPanier = async (req, res) => {
  try {
    const { recipeId } = req.body;

    if (!recipeId) {
      return res
        .status(400)
        .json({ message: "L'id de la recette est manquant" });
    } else {
      const userId = req.userId;
      // Add recipeId in user panier if new element
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { panier: recipeId } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      } else {
        res.status(200).json({ success: true, panier: updatedUser.panier });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeToPanier = async (req, res) => {
  try {
    // His id is in params beacause it is specfied in the front-end
    const { recipeId } = req.params;
    if (!recipeId) {
      return res.status(400).json({ message: "recipeId manquant" });
    } else {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      // Delete the id by filtering out those that are different
      if (user.panier.includes(recipeId)) {
        user.panier = user.panier.filter((r) => r !== recipeId);
        await user.save();
      }

      res.status(200).json({ success: true, panier: user.panier });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TODO : Achat : Adresse par default via le backend pour generer la facture, vider le panier, déplacer vers le buy

exports.addToAddress = async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ message: "address manquant" });
    } else {
      const userId = req.userId;
      await User.findByIdAndUpdate(
        userId,
        // All old addresses aren't by default
        { $set: { "addresses.$[].isDefault": false } },
        { new: true }
      );

      const addressWithDefault = {
        ...address,
        isDefault: true,
      };
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        // Position 0 for the front-end
        { $push: { addresses: { $each: [addressWithDefault], $position: 0 } } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      } else {
        res
          .status(200)
          .json({ success: true, addresses: updatedUser.addresses });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateAddressById = async (req, res) => {
  try {
    const { id, newAddress } = req.body;

    if (!newAddress || !id) {
      return res.status(400).json({ message: "Adresse ou ID manquant" });
    } else {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      } else {
        // Put all addresses in "false"
        user.addresses.forEach((addr) => {
          addr.isDefault = false;
        });

        // Find the id
        const index = user.addresses.findIndex(
          (addr) => String(addr.id) === String(id)
        );
        if (index === -1) {
          return res.status(404).json({ message: "Adresse non trouvée" });
        }

        // Get update adress
        const updatedAddress = {
          ...user.addresses[index]._doc,
          ...newAddress,
          isDefault: true,
        };

        // Delete old position
        user.addresses.splice(index, 1);

        // Reinsert at the beginning of the table
        user.addresses.unshift(updatedAddress);

        await user.save();

        res.status(200).json({ success: true, addresses: user.addresses });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.removeToAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;

    if (!addressId) {
      return res.status(400).json({ message: "address manquant" });
    } else {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      } else {
        // Delete the address by filtering out those that are different
        user.addresses = user.addresses.filter(
          (address) => String(address._id) !== String(addressId)
        );

        await user.save();

        res.status(200).json({ success: true, addresses: user.addresses });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
