// api/reviews.js
import mongoose from 'mongoose';

// Modèle Review
const ReviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

let Review;
try {
  Review = mongoose.model('Review');
} catch {
  Review = mongoose.model('Review', ReviewSchema);
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
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } 
    else if (req.method === 'POST') {
      delete req.body._id;
      const review = new Review(req.body);
      const savedReview = await review.save();
      res.status(201).json(savedReview);
    } 
    else {
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur API reviews:', error);
    res.status(500).json({ error: error.message });
  }
}