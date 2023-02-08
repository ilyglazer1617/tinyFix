const Comment = require("../models/Comments");
const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");

// !add new comment

router.post("/:post_id/:garage_id", async (req, res) => {
  // console.log("first");

  try {
    const newComment = new Comment({
      garage_id: req.params.garage_id,
      post_id: req.params.post_id,
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

//!get all comments of a specific posts by sorting bids,pro,rel to disply the garage or user

router.post("/sortComments/display/:post_id", async (req, res) => {
  console.log("first");
  const prof = req.body.prof;
  const reli = req.body.reli;
  try {
    let comments = await Comment.find({ post_id: req.params.post_id })
      .sort({ bid: 1 })
      .populate({ path: "garage_id" });

    comments = comments.map((comment) => {
      function averageProf(ARRprfessionalism) {
        let sum = 0;
        for (let i = 0; i < ARRprfessionalism.length; i++) {
          sum += ARRprfessionalism[i];
        }
        return sum / ARRprfessionalism.length;
      }

      const avgPrfessionalism = parseFloat(
        averageProf(comment.garage_id.reviews.prfessionalism).toFixed(1)
      );

      comment.garage_id.reviews.prfessionalism = avgPrfessionalism;

      function averageRel(ARRreliability) {
        let sum = 0;
        for (let i = 0; i < ARRreliability.length; i++) {
          sum += ARRreliability[i];
        }
        return sum / ARRreliability.length;
      }

      const avgReliability = parseFloat(
        averageRel(comment.garage_id.reviews.reliability).toFixed(1)
      );
      console.log(avgReliability);

      comment.garage_id.reviews.reliability = avgReliability;

      return comment;
    });

    if (prof) {
      comments = comments.sort((a, b) => {
        return (
          b.garage_id.reviews.prfessionalism[0] -
          a.garage_id.reviews.prfessionalism[0]
        );
      });
    }
    if (reli) {
      comments = comments.sort((a, b) => {
        return (
          b.garage_id.reviews.reliability[0] -
          a.garage_id.reviews.reliability[0]
        );
      });
    }

    res.send(comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message, tyu: "sdfsd" });
  }
});

// router.get("/byPrfessionalism/:post_id", async (req, res) => {
//   // console.log("first");
//   try {
//     const comments = await Comment.find({ post_id: req.params.post_id }).populate({ path: "garage_id" });

//     comments

//     res.send(comments);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

module.exports = router;

