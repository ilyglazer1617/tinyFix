const router = require("express").Router();
const Conversation = require("../models/Conversation");

//! new conv
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).send(savedConversation);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get conv of a user

// router.get("/:userId", async (req, res) => {
//   try {
//     const conversation = await Conversation.find({
//       members: { $in: req.params.userId },
//     });
//     res.status(200).send(conversation);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

router.get("/:userId", async (req, res) => {
  try {
    let conversation = await Conversation.find({
      members: { $in: req.params.userId },
    });
    // conversation = await Conversation.aggregate([
    //   {
    //     $lookup: {
    //       from: "garages",
    //       localField: "members",
    //       foreignField: "_id",
    //       as: "garageImfo",
    //     },
    //   },
    //   {
    //     $match: {
    //       members: { $in: req.params.userId },
    //     },
    //   },
    // ]);
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
