const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Review = require("./models/Review");
const Prices = require("./models/Prices");
const InfoAddRecipes = require("./models/InfoAddRecipes");
const Recipe = require("./models/Recipe");

const app = express();

app.use(express.json());

// Connexion MongoDB optimisée pour Vercel (fonctions serverless)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI non définie dans les variables d'environnement");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Limite pour Vercel
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log("Connexion à MongoDB réussie !");
  } catch (error) {
    console.error("Connexion à MongoDB échouée :", error);
    throw error;
  }
};

// Middleware pour assurer la connexion DB avant chaque requête
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Erreur de connexion DB:", error);
    res.status(500).json({ 
      error: "Erreur de connexion à la base de données",
      message: error.message 
    });
  }
});

// CORS amélioré
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:5173", // Vite dev
    "http://localhost:3000", // Alternative locale
    process.env.FRONTEND_URL, // URL de production
  ].filter(Boolean);

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (process.env.NODE_ENV === "development") {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
});

// Route de test pour vérifier que l'API fonctionne
app.get("/api", (req, res) => {
  res.json({ 
    message: "API Laura Diet 2.0 fonctionne correctement !",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Route reviews avec gestion d'erreur améliorée
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Erreur lors de la récupération des reviews:", error);
    res.status(400).json({ error: error.message });
  }
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

// Route prices avec async/await
app.get("/api/prices", async (req, res) => {
  try {
    const prices = await Prices.find();
    res.status(200).json(prices);
  } catch (error) {
    console.error("Erreur lors de la récupération des prix:", error);
    res.status(400).json({ error: error.message });
  }
});

// Route recipes info avec async/await
app.get("/api/infoaddrecipes", async (req, res) => {
  try {
    const infoAddRecipes = await InfoAddRecipes.find();
    res.status(200).json(infoAddRecipes);
  } catch (error) {
    console.error("Erreur lors de la récupération des infos recettes:", error);
    res.status(400).json({ error: error.message });
  }
});

// Route recipes avec async/await
app.get("/api/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error);
    res.status(400).json({ error: error.message });
  }
});

// Route de nettoyage des reviews (remplace le cron job pour Vercel)
app.post("/api/cleanup-reviews", async (req, res) => {
  console.log("Suppression automatique des vieux commentaires lancée...");
  try {
    const count = await Review.countDocuments();
    if (count <= 6) {
      return res.json({
        message: "Moins de 7 commentaires, aucune suppression effectuée.",
        count: count
      });
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
    res.json({
      message: `${result.deletedCount} commentaires supprimés avec succès.`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Erreur lors de la suppression automatique :", error);
    res.status(500).json({ error: error.message });
  }
});

// Gestion des erreurs 404 pour les routes API non trouvées
app.use("/api/*", (req, res) => {
  res.status(404).json({ 
    error: "Route API non trouvée",
    path: req.path,
    method: req.method
  });
});

// Export pour Vercel
module.exports = app;

// ⚠️ IMPORTANT: Le cron job original ne fonctionne pas sur Vercel
// Il est remplacé par la route /api/cleanup-reviews et les Vercel Cron Jobs
// Pour le développement local, vous pouvez garder le cron job :

if (process.env.NODE_ENV !== "production") {
  const cron = require("node-cron");
  
  cron.schedule("0 3 * * *", async () => {
    console.log("Suppression automatique des vieux commentaires lancée (local)...");
    try {
      await connectDB();
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

  // Serveur local pour développement
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
}