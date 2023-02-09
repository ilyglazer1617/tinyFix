const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    userChat_side: {},
  },
  { timestamps: true }
);
module.exports = mongoose.model("Conversation", ConversationSchema);
