const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
app.use(express.json());

const path = require("path");
const fs = require("fs/promises");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

// CORS managment
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Routes
const reviewRoutes = require("./routes/reviews");
const pricesRoutes = require("./routes/prices");
const infoAddRecipesRoutes = require("./routes/infoAddRecipes");
const recipesRouter = require("./routes/recipes");
const usersRoutes = require("./routes/users");

// Use routes
app.use("/assets/img", express.static(path.join("./", "assets/img")));
app.use("/api/reviews", reviewRoutes);
app.use("/api/prices", pricesRoutes);
app.use("/api/infoaddrecipes", infoAddRecipesRoutes);
app.use("/api/recipes", recipesRouter);
app.use("/api/users", usersRoutes);

// Generate with Chatgpt with delete some elements after 10 minutes
const Review = require("./models/Review");
const User = require("./models/Users");

// Users
const idUserTest = "68e4f9f4359579aa77639312";
const idsToKeep = [
  idUserTest,
  "68a86b2e5c34f943f6a29d3b",
  "68e66028e7055830c841f270",
];

// AddressesUserTest
const addressesUser = [
  {
    lastName: "Moreau",
    firstName: "Lucas",
    address: "21 Boulevard de la Maquette",
    postalCode: "69003",
    city: "Lyon",
    country: "France",
    isDefault: true,
    _id: "68e3d1685caf33fb34046961",
  },

  {
    lastName: "Dubois",
    firstName: "Claire",
    address: "7 Avenue des Exemples",
    postalCode: "63000",
    city: "Clermont-Ferrand",
    country: "France",
    isDefault: false,
    _id: "68e3d13c5caf33fb34046957",
  },

  {
    lastName: "Martin",
    firstName: "Pierre",
    address: "12 Rue du Test",
    postalCode: "87100",
    city: "Limoges",
    country: "France",
    isDefault: false,
    _id: "68e3d1105caf33fb3404694d",
  },
];

cron.schedule("*/10 * * * *", async () => {
  try {
    // Delete new review some thanks to the date
    const cutoffDate = new Date("2025-02-28T00:00:00.000Z");
    await Review.deleteMany({ date: { $gt: cutoffDate } });

    // Delete all users except those to keep
    await User.deleteMany({
      _id: { $nin: idsToKeep.map((id) => new mongoose.Types.ObjectId(id)) },
    });

    // Resets cart, purchases and addresses of the test account in a single update
    await User.updateOne(
      { _id: idUserTest },
      {
        $set: {
          panier: ["68dd207ea7293698d4fa7156"],
          purchases: [
            "68dd207ea7293698d4fa7159",
            "68dd207ea7293698d4fa7166",
            "68dd207ea7293698d4fa715f",
          ],
          addresses: addressesUser,
        },
      }
    );

    // Delete others invoices
    const usersRootFolder = path.join("./uploads/users");
    const userFolders = await fs.readdir(usersRootFolder);

    if (userFolders.includes(idUserTest)) {
      const folderUserTest = path.join(
        "./uploads/users",
        idUserTest,
        "factures"
      );
      const invoicesFolder = await fs.readdir(folderUserTest);
      const invoicesSave = [
        "Facture-11-10-2025-1.pdf",
        "Facture-11-10-2025-2.pdf",
      ];

      for (const file of invoicesFolder) {
        if (!invoicesSave.includes(file)) {
          const filePath = path.join(folderUserTest, file);

          // Lets you know if it is a file or a folder.
          const stat = await fs.stat(filePath);
          // fs.unlink(filePath) removes the file from disk.
          if (stat.isFile()) await fs.unlink(filePath);
        }
      }
    }

    // Delete others folder
    for (const folder of userFolders) {
      if (!idsToKeep.includes(folder)) {
        const folderDelete = path.join(usersRootFolder, folder);
        await fs.rm(folderDelete, { recursive: true, force: true });
      }
    }

  } catch (error) {
    console.error("Erreur lors de la suppression automatique :", error);
  }
});

module.exports = app;
