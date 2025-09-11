const Review = require("../models/Review");

exports.showReviews = (req, res) => {
  Review.find()
    .then((reviews) => res.status(200).json(reviews))
    .catch((error) => res.status(400).json({ error }));
};

exports.createReviews = async (req, res) => {
  const comment = req.body.comment
  const enterCount = (comment.split("\n") || []).length * 49 + 1
  const checkCommentLength = 500 - comment.length - enterCount

  if(checkCommentLength <= 0) return res.status(400).json({message: "Erreur lors de la sauvegarde"})

  try {
    delete req.body._id;
    const review = new Review({ ...req.body });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
    res.status(500).json({ error: error.message });
  }
};
