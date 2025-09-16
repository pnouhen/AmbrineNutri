const Review = require("../models/Review");

exports.showReviews = (req, res) => {
  Review.find()
    .then((reviews) => res.status(200).json(reviews))
    .catch((error) => res.status(400).json({ error }));
};

exports.createReviews = async (req, res) => {
  // Enter count corresponds to a number of characters
  const comment = req.body.comment;

  // Normalize line breaks so all OS use "\n" (Windows = \r\n, old Mac = \r)
  const normalized = comment.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  // Count characters excluding line breaks, then add 50 for each line break
  const used =
    normalized.replace(/\n/g, "").length +
    (normalized.split("\n").length - 1) * 50;
  const checkCommentLength = Math.max(0, 450 - used);

  if (checkCommentLength <= 0 || checkCommentLength > 450)
    return res.status(400).json({ message: "Erreur lors de la sauvegarde" });

  try {
    delete req.body._id;
    const review = new Review({
      date: req.body.date,
      firstName:
        req.body.firstName.charAt(0).toUpperCase() +
        req.body.firstName.slice(1).toLowerCase(),
      lastName:
        req.body.lastName.charAt(0).toUpperCase() +
        req.body.lastName.slice(1).toLowerCase(),
      comment: req.body.comment.charAt(0).toUpperCase() + req.body.comment.slice(1),
      rating: req.body.rating,
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
    res.status(500).json({ error: error.message });
  }
};
