const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        requred: [true, "Post is Required"],
      },
    ],
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is Required"],
      },
    ],
    description: [
      {
        type: String,
        required: [true, "comment is required"],
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
