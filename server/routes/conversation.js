const router = require("express").Router();
const Conversation = require("../models/Conversation");

//! new conv
router.post("/", async (req, res) => {
  const garageExisits = await Conversation.find({
    garageChat_side: req.body.receiverId,
  });
  if (!garageExisits.length) {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
      userChat_side: req.body.senderId,
      garageChat_side: req.body.receiverId,
    });
    try {
      const savedConversation = await newConversation.save();
      res.status(200).send(savedConversation);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(200).send("you alrady have a chat with this gagrage");
  }
});

router.get("/:userId", async (req, res) => {
  try {
    console.log(req.params.userId);
    // let conversation = await Conversation.find({
    //   userChat_side: req.params.userId,
    // })
    let conversation = await Conversation.find({
      $or: [
        { userChat_side: req.params.userId },
        { garageChat_side: req.params.userId },
      ],
    })

      .populate("garageChat_side")
      .populate("userChat_side");
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
