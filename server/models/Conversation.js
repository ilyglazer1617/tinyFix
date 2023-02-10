const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    userChat_side: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    garageChat_side: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Garage",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Conversation", ConversationSchema);
