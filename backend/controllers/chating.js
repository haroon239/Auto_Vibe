const mongoose = require("mongoose");
const chat = require("../models/chat");
const user = require("../models/registration");
const products = require("../models/products");
// chating.js
// const { io } = require("../index.js");



module.exports.sendMessage = async (req, res) => {
  try {
    const { sender,receiver, message, productid } = req.body;
    if (!productid ||!receiver || !sender || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let existingChat = await chat.findOne({ product: productid });
    // let product = await products.findOne({ _id: productid });
    // let receiver = product ? product.user : null;

    const newMessage = {
      user: sender,
      message: message,
    };

    if (!existingChat) {
      existingChat = new chat({
        product: productid,
        chat: [{ participants: [sender, receiver], message: [newMessage] }],
      });
    } else {
      // Check if the participants already exist in the chat
      const participantsExist = existingChat.chat.some(chat => {
        const participants = chat.participants.map(participant => participant.toString());
        return participants.includes(sender.toString()) && participants.includes(receiver.toString());
      });

      // If participants exist, push new message; otherwise, add new chat object
      if (participantsExist) {
        existingChat.chat.forEach(chat => {
          const participants = chat.participants.map(participant => participant.toString());
          if (participants.includes(sender.toString()) && participants.includes(receiver.toString())) {
            chat.message.push(newMessage);
          }
        });
      } else {
        existingChat.chat.push({ participants: [sender, receiver], message: [newMessage] });
      }
    }

    await existingChat.save();

   

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getMessage = async (req, res) => {
    try {
      const { userid, productid } = req.params;
      if (!mongoose.Types.ObjectId.isValid(productid) || !userid) {
        return res.status(400).json({ error: "Invalid product ID or missing user ID" });
      }
  
      const existingChat = await chat.findOne({ product: productid, 'chat.participants': userid });
  
      if (!existingChat) {
        return res.status(404).json({ error: "Chat not found" });
      }
  
      const matchedMessages = existingChat.chat.filter(chat => {
        const participants = chat.participants.map(participant => participant.toString());
        return participants.includes(userid);
      });
  
      res.status(200).json({ messages: matchedMessages });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  module.exports.getallparticipants=async (req,res)=>{
    try {
      const firstParticipants = await chat.find({ product: req.params.productid })
      .populate({
        path: 'chat.participants',
        model: 'users', // Assuming 'User' is the name of your User model
        select: 'username email', // Select fields you want to populate
      })
      .exec()
      .then(allMessages => {
        return allMessages.flatMap(chat => {
          return chat.chat.map(chatObj => chatObj.participants[0]);
        });
      })
      res.send(firstParticipants);
    } catch (error) {
      console.log(error);
    }
  }



















  



// module.exports.getallmessages = async (req, res) => {
//   try {
//     const productid = req.params.productid;
//     // const findmessages = await chat.findOne({ product: productid });
//     const findmessages = await chat
//       .findOne({ product: productid })
//       .populate("chat.sender");

//     console.log("hello");

//     if (findmessages) {
//       console.log(findmessages);
//       res.send({ message: "completed....", data: findmessages });
//     } else {
//       res
//         .status(404)
//         .send({ message: "No messages found for the provided product ID." });
//     }
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };

// module.exports.getchatmessages = async (req, res) => {
//   try {
//     const productid = req.params.productid;
//     const userid = req.params.userid;
//     // res.send({productid:productid, userid:userid})
//     const findproduct = await chat.findOne({ product: productid });

//     if (findproduct) {
//       console.log(findproduct);
//       const messages = findproduct.chat;
//       const filterchat = messages.filter((item) => item.user1 == userid);

//       res.send({ message: "completed....", data: filterchat });
//     } else {
//       res
//         .status(404)
//         .send({ message: "No messages found for the provided product ID." });
//     }
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };

// // API for get multiple users that try for chating eith seller
// module.exports.getusers = async (req, res) => {
//   try {
//     const uniqueUser1Ids = req.body;

//     await user.find({ _id: { $in: uniqueUser1Ids } }).then((users) => {
//       res.json(users); // Send found users as response
//     });
//     console.log(uniqueUser1Ids);
//     res.send(uniqueUser1Ids);
//   } catch (error) {}
// };
