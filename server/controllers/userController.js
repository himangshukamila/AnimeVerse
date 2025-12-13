import User from "../models/User.js";

// @desc    Update user subscription
// @route   PUT /api/users/subscription
// @access  Private
export const updateSubscription = async (req, res) => {
  try {
    const { plan } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    user.subscription = {
      plan,
      startDate,
      endDate,
      isActive: plan !== "free",
    };

    await user.save();

    res.json({
      message: "Subscription updated successfully",
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add to favorites
// @route   POST /api/users/favorites
// @access  Private
export const addToFavorites = async (req, res) => {
  try {
    const { animeId, title, image } = req.body;
    const user = await User.findById(req.user._id);

    // Check if already in favorites
    const alreadyExists = user.favorites.some((fav) => fav.animeId === animeId);

    if (alreadyExists) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    user.favorites.unshift({ animeId, title, image });
    await user.save();

    res.json({ message: "Added to favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove from favorites
// @route   DELETE /api/users/favorites/:animeId
// @access  Private
export const removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(
      (fav) => fav.animeId !== req.params.animeId
    );
    await user.save();

    res.json({ message: "Removed from favorites", favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get favorites
// @route   GET /api/users/favorites
// @access  Private
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add to watchlist
// @route   POST /api/users/watchlist
// @access  Private
export const addToWatchlist = async (req, res) => {
  try {
    const { animeId, title, image } = req.body;
    const user = await User.findById(req.user._id);

    const alreadyExists = user.watchlist.some(
      (item) => item.animeId === animeId
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Already in watchlist" });
    }

    user.watchlist.unshift({ animeId, title, image });
    await user.save();

    res.json({ message: "Added to watchlist", watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove from watchlist
// @route   DELETE /api/users/watchlist/:animeId
// @access  Private
export const removeFromWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.watchlist = user.watchlist.filter(
      (item) => item.animeId !== req.params.animeId
    );
    await user.save();

    res.json({ message: "Removed from watchlist", watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get watchlist
// @route   GET /api/users/watchlist
// @access  Private
export const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update continue watching
// @route   POST /api/users/continue-watching
// @access  Private
export const updateContinueWatching = async (req, res) => {
  try {
    const { animeId, title, image, episode, timestamp, duration } = req.body;
    const user = await User.findById(req.user._id);

    // Find if anime already exists in continue watching
    const existingIndex = user.continueWatching.findIndex(
      (item) => item.animeId === animeId
    );

    if (existingIndex !== -1) {
      // Update existing entry
      user.continueWatching[existingIndex] = {
        animeId,
        title,
        image,
        episode,
        timestamp,
        duration,
        lastWatched: new Date(),
      };
    } else {
      // Add new entry
      user.continueWatching.unshift({
        animeId,
        title,
        image,
        episode,
        timestamp,
        duration,
      });
    }

    // Keep only last 20 items
    if (user.continueWatching.length > 20) {
      user.continueWatching = user.continueWatching.slice(0, 20);
    }

    await user.save();

    res.json({
      message: "Continue watching updated",
      continueWatching: user.continueWatching,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get continue watching
// @route   GET /api/users/continue-watching
// @access  Private
export const getContinueWatching = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.continueWatching);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
