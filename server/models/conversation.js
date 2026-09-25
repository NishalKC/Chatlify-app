const mongoose = require("mongoose")

const ConversationSchema = mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    latestmessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    }
},{timestamps: true}
)

module.exports = mongoose.model("conversation", ConversationSchema)