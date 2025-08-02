// api/prices.js
import mongoose from 'mongoose';

// Modèle Prices - adaptez selon votre modèle
const PricesSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});

let Prices;
try {
  Prices = mongoose.model('Prices');
} catch {
  Prices = mongoose.model('Prices', PricesSchema);
}

// Connexion MongoDB
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI non définie');
  }

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });
  
  isConnected = true;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      const prices = await Prices.find();
      res.status(200).json(prices);
    } else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur API prices:', error);
    res.status(500).json({ error: error.message });
  }
}