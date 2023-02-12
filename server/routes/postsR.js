const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");
const Comment = require("../models/Comments");

const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "dzbxzzc0q",
  api_key: "495238798112886",
  api_secret: "e734BVzI-D26tMOO48-MPwswTXI",
});

//!CLIENT------------------

//!add a new post

router.post("/", async (req, res) => {
  // console.log(req.body.images);
  try {
    console.log(req.body.user_id);
    const images = req.body.images;
    const urlArray = [];

    for (let i = 0; i < images.length && i < 4; i++) {
      const imgUploud = await cloudinary.uploader.upload(images[i], {
        folder: "posts",
      });
      urlArray.push(imgUploud.secure_url);
    }
    console.log(urlArray);

    const newPost = new Post({
      user_id: req.body.user_id,
      description: req.body.description,
      problem_classification: req.body.problem_classification,
      images: urlArray,
    });

    const post = await newPost.save();
    res.send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//! PUT endpoint to edit a post
router.put("/:post_Id", async (req, res) => {
  try {
    // Get post_Id from the URL path parameters
    const post_Id = req.params.post_Id;

    // Get updates from the request body
    const updates = req.body;

    // Update the post in the database
    const updatedPost = await Post.findByIdAndUpdate(post_Id, updates, {
      new: true, // Return the updated document instead of the original document
    });

    // Return success response with the updated post
    return res.status(200).send(updatedPost);
  } catch (error) {
    // Return error response if there was an error updating the post
    return res.status(500).send({
      success: false,
      error: `Error updating post: ${error.message}`,
    });
  }
});

//! DELETE a post
router.delete("/:post_Id", async (req, res) => {
  try {
    // Get post_Id from the URL path parameters
    const post_Id = req.params.post_Id;
    const deletedPost = await Post.findByIdAndDelete(post_Id);

    // Return success response with the deleted post
    return res.status(200).send({
      success: true,
      data: deletedPost,
    });
  } catch (error) {
    // Return error response if there was an error deleting the post
    return res.status(500).send({
      success: false,
      error: `Error deleting post: ${error.message}`,
    });
  }
});

//!GET all posts that user id published

router.get("/:user_id", async (req, res) => {
  try {
    const posts = await Post.find({ user_id: req.params.user_id });
    res.send(posts);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving posts" });
  }
});

//!CLIENT!!!------------------
//?-------------------------

//!GARAGE====================

//!get all posts
router.get("/districtFilter/:district", async (req, res) => {
  const district = req.params.district;
  try {
    // let posts = await Post.find({  }).populate({
    //   path: "user_id",
    //   // match: { district: req.params.district },
    // });
    let posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: {
          "user.district": district,
        },
      },
    ]);
    res.send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// router.post("/filter", async (req, res) => {
//   try {
//     const posts = await Post.find(req.body.params).populate({
//       path: "user_id",
//     });
//     console.log(posts);
//     res.send(posts);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

//!get posts by district,problem,car_make, garage_id comments
router.post("/withFilters/:district", async (req, res) => {
  const district = req.params.district;
  const car_make = req.body.car_make;
  const problem_classification = req.body.problem_classification;
  const garage_id = req.body.garage_id;

  try {
    let posts = null;

    //if gararge want the posts that he comment on tham
    if (garage_id) {
      const comments = await Comment.find({ garage_id: garage_id });
      if (!comments) {
        return res.status(404).send({ error: "No comments found." });
      }
      const postIds = comments.map((comment) => comment.post_id);

      posts = await Post.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $match: {
            _id: { $in: postIds },
          },
        },
        {
          $lookup: {
            from: "comments",
            let: { post_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$post_id", "$$post_id"],
                  },
                },
              },
              {
                $sort: {
                  bid: 1,
                },
              },
              {
                $limit: 1,
              },
            ],
            as: "comments",
          },
        },
      ]);

      console.log(posts);

      if (posts.length == 0) {
        res.send("no bids to this garage");
      }
    }
    // all post in a district
    else {
      posts = await Post.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $match: {
            "user.district": district,
          },
        },
        {
          $lookup: {
            from: "comments",
            let: { post_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$post_id", "$$post_id"],
                  },
                },
              },
              {
                $sort: {
                  bid: 1,
                },
              },
              {
                $limit: 1,
              },
            ],
            as: "comments",
          },
        },
      ]);
    }

    if (car_make) {
      posts = posts.filter((post) => post.user[0].car_make === car_make);
    }

    if (problem_classification) {
      posts = posts.filter((post) => post.problem_classification == problem_classification);
    }
    res.send(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error retrieving posts" });
  }
});

// //! get all the posts that specific garage comment on them

// router.get("/myBids/:garage_id", async (req, res) => {
//   //   console.log(req.params);
//   try {
//     const comments = await Comment.find({ garage_id: req.params.garage_id });
//     if (!comments) {
//       return res.status(404).send({ error: "No comments found." });
//     }
//     // console.log(comments)
//     const postIds = comments.map((comment) => comment.post_id);
//     //   const posts = await Post.find({ _id: { $in: postIds } });

//     let posts = await Post.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "user_id",
//           foreignField: "_id",
//           as: "user",
//         },
//       },
//       {
//         $match: {
//           _id: { $in: postIds },
//         },
//       },
//     ]);

//     if (posts.length == 0) {
//       res.send("no bids to this garage");
//     }
//     console.log(posts);
//     res.status(200).send(posts);
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

//!GARAGE====================

module.exports = router;
