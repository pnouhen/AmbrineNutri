const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");

exports.signup = (req, res, next) => {
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
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Identifiant/mot de passe incorrect" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Identifiant/mot de passe incorrect" });
          }

          res.status(200).json({
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
            },
            token: jwt.sign(
              { userID: user._id, role: user.role },
              process.env.JWT_SECRET,
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getMe = (req, res) => {
  User.findById(req.userId)
    .select("-password") // exclut le mot de passe
    .then((user) => {
      if (!user)
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      res.status(200).json(user);
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.addToPanier = async (req, res) => {
  try {
    const userId = req.userId;
    const { recipeId } = req.body;

    if (!recipeId)
      return res.status(400).json({ message: "recipeId manquant" });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { panier: recipeId } },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).json({ success: true, panier: updatedUser.panier });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeToPanier = async (req, res) => {
  try {
    const userId = req.userId;
    const { recipeId } = req.params; // <- on récupère depuis l'URL maintenant

    if (!recipeId) {
      return res.status(400).json({ message: "recipeId manquant" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (user.panier.includes(recipeId)) {
      user.panier = user.panier.filter((r) => r !== recipeId); // <- on réaffecte
      await user.save();
    }

    res.status(200).json({ success: true, panier: user.panier });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToAddress = async (req, res) => {
  try {
    const userId = req.userId; 
    const { address } = req.body;
    
    if (!address) {
      return res.status(400).json({ message: "address manquant" });
    }
    
    const addressWithDefault = {
      ...address,
      default: true
    };
    
    await User.findByIdAndUpdate(
      userId,
      { $set: { "addresses.$[].default": false } }, 
      { new: true }
    );
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: { $each: [addressWithDefault], $position: 0 } } },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    res.status(200).json({ success: true, addresses: updatedUser.addresses }); // "addresses" pas "adresses"
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateAddressById = async (req, res) => {
  try {
    const userId = req.userId;
    const { id, newAddress } = req.body; 

    if (!newAddress || !id) {
      return res.status(400).json({ message: "Adresse ou ID manquant" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const index = user.addresses.findIndex(a => a.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Adresse non trouvée" });
    }

    user.addresses[index] = newAddress;

    await user.save();

    res.status(200).json({ success: true, address: user.address });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.removeToAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const addressId = Number(req.params.addressId); // <- corrige ici

    if (!addressId) {
      return res.status(400).json({ message: "address manquant" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    user.addresses = user.addresses.filter((addr) => addr.id !== addressId);

    await user.save();

    res.status(200).json({ success: true, addresses: user.addresses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateIsDefault = async (req, res) => {
  try {
    const userId = req.userId;
    const { id, newAddress } = req.body; // récupère depuis le body

    if (!newAddress || !id) {
      return res.status(400).json({ message: "Adresse ou ID manquant" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Trouver l'adresse existante par ID
    const index = user.address.findIndex(a => a.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Adresse non trouvée" });
    }

    // Mettre à jour isDefault
    user.address.map(adrs => adrs.isDefault = false)
    user.address[index].isDefault = true;

    await user.save();

    res.status(200).json({ success: true, address: user.address });

  } catch(err) {
    res.status(500).json({message: err.message})
  }
}