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
