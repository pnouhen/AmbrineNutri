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
