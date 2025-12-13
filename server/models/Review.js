import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    animeId: {
      type: String,
      required: true,
    },
    animeTitle: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
reviewSchema.index({ animeId: 1, createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
