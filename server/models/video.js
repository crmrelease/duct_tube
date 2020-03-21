const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    
    writer:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    privacy:{
        type:String
    },
    filePath:{
        type:String
    },
    category:{
        type:String
    },
    views:{
        type:String,
        default:0
    },
    duration:{
        type:String
    },
    thumbnail:{
        type:String
    },
 
},{timestamps:true})
module.exports = mongoose.model('video',videoSchema)
