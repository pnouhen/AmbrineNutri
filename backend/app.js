const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();

const Review = require("./models/Review");
const Prices = require("./models/Prices");
const InfoAddRecipes = require("./models/InfoAddRecipes");
const Recipe = require("./models/Recipe");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

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

// Route reviews
app.get("/api/reviews", (req, res) => {
  Review.find()
    .then((reviews) => res.status(200).json(reviews))
    .catch((error) => res.status(400).json({ error }));
});

app.post("/api/reviews", async (req, res) => {
  try {
    delete req.body._id;
    const review = new Review({ ...req.body });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
    res.status(500).json({ error: error.message });
  }
});

// Generer par Chatgpt pour supprimer un nouveau reviews au bout de 10 minutes
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

// Route prices
app.get("/api/prices", (req, res) => {
  Prices.find()
    .then((prices) => res.status(200).json(prices))
    .catch((error) => res.status(400).json({ error }));
});

// Route recipes
app.get("/api/infoaddrecipes", (req, res) => {
  InfoAddRecipes.find()
    .then((infoAddRecipes) => res.status(200).json(infoAddRecipes))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => res.status(200).json(recipes))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
