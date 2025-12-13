import express from "express";
import {
  createReview,
  getAnimeReviews,
  updateReview,
  deleteReview,
  likeReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(protect, createReview);

router.get("/:animeId", getAnimeReviews);

router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

router.put("/:id/like", protect, likeReview);

export default router;
