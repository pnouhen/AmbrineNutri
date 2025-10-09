const User = require("../../models/Users");
const Prices = require("../../models/Prices");

exports.changePrices = async (req, res) => {
  try {
    // Check if admin
    const admin = await User.findById(req.userId);
    if (admin.role !== "admin")
      return res.status(400).json({ message: "Vous n'avez pas les droits d'accès" });

    const pricesUpdate = req.body;

    let prices = []

    for (const consult of pricesUpdate) {
  const newPrices = await Prices.findByIdAndUpdate(
    consult._id,
    {
      $set: {
        "values.price": consult.values.price,
        "values.coupleRate": consult.values.coupleRate,
      },
    },
    { new: true }
  );

  prices.push(newPrices)
}

res.status(200).json(prices)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
