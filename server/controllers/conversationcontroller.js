const conversation = require("../models/conversation")

module.exports.Createconversation= async (req, res)=>{
    try{
        let {reciverId}= req.body
        let existingconversations= await conversation.findOne({
            participants:{
                $all:[req.user._id, reciverId]
            }
        })

        if(existingconversations){
            return res.json(existingconversations)
        }

        let newconversations = await conversation.create({
            participants: [req.user._id, reciverId]
        })

        return res.json(newconversations)

    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.Getconversation = async(req, res  ) => {
    try{
    const Conversations = await conversation.find({
      participants: req.user._id,
    })
      .populate("participants", "-password")
      .populate("latestmessage")
      .sort({ updatedAt: -1 });

    return res.json(Conversations);
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}