const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is Required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is Required"],
    },
    password: {
      type: String,
      required: [true, "Password, is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    profilePhoto: {
      type: String,
    },

    isBlock: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Editor"],
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    viwers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    plane: [
      {
        type: String,
        enum: ["freetown", "usyetPower"],
        default: true,
      },
    ],

    userAward: [
      {
        type: String,
        enum: ["Bronze", "Silver", "Gold"],
        default: "Bronze",
      },
    ],
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
