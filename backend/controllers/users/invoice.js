const path = require("path");
const fs = require("fs");

exports.getInvoicesRecipes = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId)
      return res.status(400).json({ message: "Utilisateur non trouvé" });

    // To recover invoices

    const userFolder = path.join(
      __dirname,
      "../../uploads",
      "users",
      userId,
      "factures"
    );

    // Check if folder exists
    if (!fs.existsSync(userFolder)) return res.join([]);

    const files = fs
      .readdirSync(userFolder)
      .filter((invoice) => invoice.endsWith(".pdf"))

    res.json(files);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.sendFile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const fileName = req.params.fileName;
    const filePath = path.join(
      __dirname,
      "../../uploads",
      "users",
      userId,
      "factures",
      fileName
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Fichier introuvable" });
    }

    res.sendFile(path.resolve(filePath));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
