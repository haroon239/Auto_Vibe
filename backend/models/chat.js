const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    chat: [
      {
        participants: [
          { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
          },
          { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
          }
        ],
        message: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "users",
              required: true,
            },
            message: {
              type: String,
              required: true
            },
            timestamp: {
              type: Date,
              default: Date.now
            }
          }
        ]
      }
    ]
  }
);

const ProductChat = mongoose.model("messages", chatSchema);

module.exports = ProductChat;
