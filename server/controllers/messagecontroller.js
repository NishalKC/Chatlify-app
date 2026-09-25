const conversation = require("../models/conversation")
const messageModel = require("../models/message")
const message = require("../models/message")
const {io ,onlineUsers } = require("../socket/socket")

module.exports.sendmessage=async  (req, res ) => {
    try {
        let{conversationId, receiverId,text}= req.body
        let message = await messageModel.create({
            conversation: conversationId,
            sender:req.user._id,
            text,
        })
        await conversation.findOneAndUpdate({_id: conversationId},{
            latestmessage: message._id
        })
        let receiverSocket= onlineUsers.get(receiverId)
        if(receiverScoket){
            io.to(receiverSocket).emit("receive-message", message)
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
