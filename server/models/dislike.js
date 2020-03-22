const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
userId:{
    type:Schema.Types.ObjectId,
    ref:'user'
},
commentId:{
    type:Schema.Types.ObjectId,
    ref:'comment'
},
videoId:{
    type:Schema.Types.ObjectId,
    ref:'video'
}
    
},{timestamps:true})

module.exports = mongoose.model('dislike',dislikeSchema)