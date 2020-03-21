const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'video',
    },
    responseTo:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    content:{
        type:String
    }

},{timestamps:true})

module.exports = mongoose.model('comment',commentSchema)
