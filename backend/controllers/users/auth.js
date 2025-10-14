const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/Users");

exports.signup = (req, res) => {
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
    .select("-password -email -_id -__v")
    .then((user) => {
      if (!user)
        return res.status(401).json({ message: "Utilisateur non trouvé" });
      res.status(200).json(user);
    })
    .catch((error) => res.status(500).json({ error }));
};
