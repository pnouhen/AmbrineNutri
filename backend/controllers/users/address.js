const User = require("../../models/Users");

const { isValidAddress } = require("../../utils/isValidAddress");

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

    res.status(200).json({ address: user.addresses[0] });
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
