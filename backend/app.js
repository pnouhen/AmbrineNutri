const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();

const reviewRoutes = require("./routes/reviews");
const pricesRoutes = require("./routes/prices");
const infoAddRecipesRouter = require("./routes/infoAddRecipes");
const recipeRouter = require("./routes/recipe");
const users = require("./routes/user");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

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

app.use("/api/reviews", reviewRoutes);
app.use("/api/prices", pricesRoutes);
app.use("/api/infoaddrecipes", infoAddRecipesRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/users", users);

// Generer par Chatgpt pour supprimer un nouveau reviews au bout de 10 minutes
const Review = require("./models/Review");
const User = require("./models/Users");

cron.schedule("*/10 * * * *", async () => {
  try {
    // Supprimer les reviews après le 28 février 2025
    const cutoffDate = new Date("2025-02-28T00:00:00.000Z");
    await Review.deleteMany({ date: { $gt: cutoffDate } });

    // Supprimer les utilisateurs sauf ceux à conserver
    const idsToKeep = ["68a86b065c34f943f6a29d39", "68a86b2e5c34f943f6a29d3b"];

    await User.deleteMany({ _id: { $nin: idsToKeep } });

    // Vider le panier de l'utilisateur spécifique
    const specialUserId = "68a86b065c34f943f6a29d39";
    await User.updateOne({ _id: specialUserId }, { $set: { panier: [] } });
  } catch (error) {
    console.error("Erreur lors de la suppression automatique :", error);
  }
});

module.exports = app;
