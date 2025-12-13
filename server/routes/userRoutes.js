import express from "express";
import {
  updateSubscription,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  updateContinueWatching,
  getContinueWatching,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router.put("/subscription", updateSubscription);

router.route("/favorites").get(getFavorites).post(addToFavorites);

router.delete("/favorites/:animeId", removeFromFavorites);

router.route("/watchlist").get(getWatchlist).post(addToWatchlist);

router.delete("/watchlist/:animeId", removeFromWatchlist);

router
  .route("/continue-watching")
  .get(getContinueWatching)
  .post(updateContinueWatching);

export default router;
