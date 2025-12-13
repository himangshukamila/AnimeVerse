import Review from "../models/Review.js";

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { animeId, animeTitle, rating, comment } = req.body;

    // Check if user already reviewed this anime
    const existingReview = await Review.findOne({
      animeId,
      userId: req.user._id,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You already reviewed this anime" });
    }

    const review = await Review.create({
      animeId,
      animeTitle,
      userId: req.user._id,
      username: req.user.username,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reviews for an anime
// @route   GET /api/reviews/:animeId
// @access  Public
export const getAnimeReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ animeId: req.params.animeId })
      .populate("userId", "username avatar")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.deleteOne();
    res.json({ message: "Review removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like a review
// @route   PUT /api/reviews/:id/like
// @access  Private
export const likeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const alreadyLiked = review.likedBy.includes(req.user._id);

    if (alreadyLiked) {
      // Unlike
      review.likedBy = review.likedBy.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
      review.likes = review.likedBy.length;
    } else {
      // Like
      review.likedBy.push(req.user._id);
      review.likes = review.likedBy.length;
    }

    await review.save();
    res.json({ likes: review.likes, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
