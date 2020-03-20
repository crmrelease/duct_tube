const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribeSchema = mongoose.Schema({

    userTo:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    userFrom:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }

},{timestamps:true})


module.exports = mongoose.model('subscribe',subscribeSchema)
