const Comment = require("../models/Comments");
const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");

// !add new comment

router.post("/:garage_id", async (req, res) => {
  // console.log("first");
  try {
    const newComment = new Comment({
      garage_id: req.params.garage_id,
      //todo post_id: req.body.post_id,
      post_id: "63e127368f932b42a5996348",
      bid: Number(req.body.bid),
      text: req.body.text,
    });
    await newComment.save();
    res.status(201).send({ message: "Comment added successfully." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//! update comment

router.put("/:comment_id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.comment_id);
    if (!comment) {
      return res.status(404).send({ error: "Comment not found." });
    }

    comment.bid = req.body.bid;
    comment.text = req.body.text;

    await comment.save();
    res.status(200).send({ message: "Comment updated successfully." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//!delete commet by comment id

router.delete("/:comment_id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.comment_id);
    if (!comment) {
      return res.status(404).send({ error: "Comment not found." });
    }
    res.status(200).send({ message: "Comment deleted successfully." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//!get all comments of a specific posts by sorting bids to disply to the garage

router.get("/byBids/:post_id", async (req, res) => {
  console.log("first");
  try {
    const comments = await Comment.find({ post_id: req.params.post_id }).sort({ bid: 1 }).populate({ path: "garage_id" });

    res.send(comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
