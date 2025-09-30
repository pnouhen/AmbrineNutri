

const User = require("../../models/Users");

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