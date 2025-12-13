import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      type: String,
      default: "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
    },
    subscription: {
      plan: {
        type: String,
        enum: ["free", "premium", "ultimate"],
        default: "free",
      },
      startDate: Date,
      endDate: Date,
      isActive: {
        type: Boolean,
        default: false,
      },
    },
    favorites: [
      {
        animeId: String,
        title: String,
        image: String,
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    watchlist: [
      {
        animeId: String,
        title: String,
        image: String,
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    continueWatching: [
      {
        animeId: String,
        title: String,
        image: String,
        episode: Number,
        timestamp: Number, // seconds watched
        duration: Number, // total duration
        lastWatched: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update avatar based on username
userSchema.pre("save", function (next) {
  if (this.isModified("username") && this.avatar.includes("seed=default")) {
    this.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.username}`;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
