const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      maxlength: 400,
      required: true,
    },
    problem_classification: {
      type: String,
      maxlength: 50,
      required: true,
    },
    images: {
      type: [String],
      maxlength: 4,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts", PostSchema);

module.exports = Post;
