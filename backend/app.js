const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const Review = require('./models/Review')

const app = express()

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get("/api/reviews", (req, res) => {
  Review.find()
    .then(reviews => {
      res.status(200).json(reviews);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

module.exports = app