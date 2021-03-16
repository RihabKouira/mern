const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
    senderimg: {
      type: String,
    },
    sendername: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatSchema);
module.exports = { Chat };
