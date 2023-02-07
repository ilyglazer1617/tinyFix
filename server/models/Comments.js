const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    garage_id: {
      type: Schema.Types.ObjectId,
      ref: "Garage",
      required: true
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true
    },
    bid: {
      type: String, 
      required: true

    },
    text: {
      type: String,
      maxlength: 400,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comments", CommentSchema);

module.exports = Comment;
