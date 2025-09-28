const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");
const Recipes = require("../models/Recipes");

const { isValidAddress } = require("../utils/isValidAddress");
const { isValidPayment } = require("../utils/isValidPayment");

const { generatePDF } = require("./pdfController");

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
                addresses: user.addresses,
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

    if (!recipeId)
      return res
        .status(400)
        .json({ message: "L'id de la recette est manquant" });

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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeToPanier = async (req, res) => {
  try {
    // His id is in params beacause it is specfied in the front-end
    const { recipeId } = req.params;
    if (!recipeId)
      return res.status(400).json({ message: "recipeId manquant" });
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToAddress = async (req, res) => {
  try {
    const { newAddress } = req.body;
    if (!newAddress)
      return res
        .status(400)
        .json({ message: "L'addresse n'est pas envoyé correctement" });

    const userId = req.userId;
    await User.findByIdAndUpdate(
      userId,
      // All old addresses aren't by default
      { $set: { "addresses.$[].isDefault": false } },
      { new: true }
    );

    const addressWithDefault = {
      ...newAddress,
      isDefault: true,
    };

    if (!isValidAddress(newAddress))
      return res
        .status(400)
        .json({ message: "Certains champs sont pas remplis correctement" });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      // Position 0 for the front-end
      { $push: { addresses: { $each: [addressWithDefault], $position: 0 } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    } else {
      res.status(200).json({ success: true, addresses: updatedUser.addresses });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateAddressById = async (req, res) => {
  try {
    const { id, updateAddress } = req.body;

    if (!updateAddress || !id)
      return res.status(400).json({ message: "Adresse ou ID manquant" });

    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (!isValidAddress(updateAddress))
      return res
        .status(400)
        .json({ message: "Certains champs sont pas remplis correctement" });

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
      ...updateAddress,
      isDefault: true,
    };

    // Delete old position
    user.addresses.splice(index, 1);

    // Reinsert at the beginning of the table
    user.addresses.unshift(updatedAddress);

    await user.save();

    res.status(200).json({ success: true, addresses: user.addresses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.removeToAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;

    if (!addressId)
      return res.status(400).json({ message: "address manquant" });

    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Delete the address by filtering out those that are different
    user.addresses = user.addresses.filter(
      (address) => String(address._id) !== String(addressId)
    );

    if (user.addresses.length === 1) user.addresses[0].isDefault = true;

    await user.save();

    res.status(200).json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.purchasesRecipes = async (req, res) => {
  try {
    const { infopurchasesRecipes } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (infopurchasesRecipes.panier.length === 0)
      return res.status(400).json({ message: "panier vide" });

    // Recipes doesn't already purchased
    const alreadyPurchased = infopurchasesRecipes.panier.some((idPanier) =>
      user.purchases.includes(idPanier)
    );
    if (alreadyPurchased)
      return res
        .status(400)
        .json({ message: "Au moins une recette est déjà achetée" });

    // Check one address is défault
    const hasDefault = user.addresses.some(
      (address) => address.isDefault === true
    );
    if (!infopurchasesRecipes.address?.isDefault && !hasDefault)
      return res
        .status(400)
        .json({ message: "Aucune adresse n'est sélectionnée" });

    // Check address is good
    if (!isValidAddress(infopurchasesRecipes.address))
      return res
        .status(400)
        .json({ message: "Certains champs sont pas remplis correctement" });

    // Check all the elements of payment
    if (!isValidPayment(infopurchasesRecipes))
      return res
        .status(400)
        .json({ message: "Un des éléments du paiement est mal rempli" });

    user.purchases = [...user.purchases, ...user.panier];
    // Reset panier here for added safety
    user.panier = [];
    await user.save();

    // TODO préparer l'element a envoyé via l'object dans pdfController
    const recipesName = [
    "1 recette recette recette recette recette",
    "1 recette recette recette recette recette",
  ];
    generatePDF(recipesName)

    return res.status(200).json({
      purchases: user.purchases,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.showRecipeSelectPurchase = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (!user.purchases.includes(recipeId))
      return res.status(400).json({ message: "Recette non acheté" });

    Recipes.findById(recipeId)
      .then((recipeSelect) => res.status(200).json(recipeSelect))
      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
