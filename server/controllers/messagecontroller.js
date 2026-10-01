const conversation = require("../models/conversation")
const messageModel = require("../models/message")
const message = require("../models/message")
const {getIO ,onlineUsers } = require("../socket/socket")

module.exports.sendmessage=async  (req, res ) => {
    try {
        let{conversationId, receiverId,text}= req.body
        let image = req.file? req.file.path : "";
        let newmessage = await messageModel.create({
            conversation: conversationId,
            sender:req.user._id,
            text,
            image
        })
        let message =await messageModel.findOne({_id: newmessage._id}).populate("sender", "username email fullname")
        await conversation.findOneAndUpdate({_id: conversationId},{
            latestmessage: message._id
        })
        let receiverSocket= onlineUsers.get(receiverId)
        if(receiverSocket){
            getIO().to(receiverSocket).emit("receive-message", message)
        }
        return res.json(message)
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

module.exports.getmessage= async(req, res ) => {
    try {
        let {conversationId}= req.params
        let message= await messageModel.find({
            conversation: conversationId
        })
        .populate("sender", "username avatar fullname")
        .sort({createdAt: 1})

        return res.json(message)
    } catch (error) {
        return res.json({
            message: error.message
        })
    }    
}

module.exports.seenmessage = async (req, res) => {
  try {
    const { conversationId } = req.body;

    console.log("👀 Seen conversation:", conversationId);
    console.log("👤 Current user:", req.user?._id);

    if (!conversationId) {
      return res.status(400).json({
        message: "conversationId is required",
      });
    }

    if (!req.user?._id) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const result = await messageModel.updateMany(
      {
        conversation: conversationId,
        sender: { $ne: req.user._id },
        seen: false,
      },
      {
        $set: {
          seen: true,
        },
      }
    );

    console.log("✅ Messages marked seen:", result.modifiedCount);

    return res.status(200).json({
      success: true,
      modifiedCount: result.modifiedCount,
    });

  } catch (error) {
    console.error("❌ Seen message error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};