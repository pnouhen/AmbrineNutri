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
  // req.userId est défini par le middleware auth
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
    const userId = req.userId; // récupéré depuis le middleware auth
    const { recipeId } = req.body;

    if (!recipeId) {
      return res.status(400).json({ message: "recipeId manquant" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (!user.panier.includes(recipeId)) {
      user.panier.push(recipeId);
      await user.save();
    }

    res.status(200).json({ success: true, panier: user.panier });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
