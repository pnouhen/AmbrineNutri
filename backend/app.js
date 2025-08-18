const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();

const reviewRoutes = require("./routes/reviews");
const pricesRoutes = require("./routes/prices");
const infoAddRecipesRouter = require('./routes/infoAddRecipes')
const recipeRouter = require('./routes/recipe')

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

// Generer par Chatgpt pour supprimer un nouveau reviews au bout de 10 minutes
const Review = require("./models/Review");

cron.schedule("*/10 * * * *", async () => {
  console.log("Suppression automatique des vieux commentaires lancée...");
  try {
    const count = await Review.countDocuments();
    if (count <= 6) {
      console.log("Moins de 7 commentaires, aucune suppression effectuée.");
      return;
    }

    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

    const result = await Review.deleteMany({
      date: {
        $gte: new Date("2025-01-01T00:00:00.000Z"),
        $lte: new Date("2100-01-31T23:59:59.999Z"),
        $lt: tenMinutesAgo,
      },
    });

    console.log(`${result.deletedCount} commentaires supprimés.`);
  } catch (error) {
    console.error("Erreur lors de la suppression automatique :", error);
  }
});

module.exports = app;
