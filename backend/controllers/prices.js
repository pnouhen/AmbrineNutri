const Prices = require("../models/Prices");

exports.showPrices = (req, res) => {
  Prices.find()
    .then((prices) => res.status(200).json(prices))
    .catch((error) => res.status(400).json({ error }));
};
