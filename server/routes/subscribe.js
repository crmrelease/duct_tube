const express = require('express')
const router = express.Router()
const subscribe =require('../models/subscribe')
const { verifyToken, apiLimiter } = require('./middleware');
const cors =require('cors')
require('dotenv').config();

router.use(cors());

router.post('/number',(req,res)=>{
    subscribe.find({'userTo':req.body.userTo})
    .exec((err,subscribeInfo)=>{
        if(err) return res.status(400).send(err);
        return res.status(200).json({success:true,subscribeNumber:subscribeInfo.length})
    })
})

router.post('/mystatus',(req,res)=>{
    subscribe.find({'userTo':req.body.userTo, 'userFrom':req.body.userFrom})
    .exec((err,subscribeInfo)=>{
        let result = false
        if(err) return res.status(400).send(err);
        if(subscribe.length !=0){
            result = true
        }
        return res.status(200).json({success:true,subscribedStatus:result})
    })
})

module.exports = router;