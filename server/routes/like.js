const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const like =require('../models/like')
const dislike =require('../models/dislike')

const {isLoggedIn, isNotLoggedIn}= require('./middleware')
const { verifyToken, apiLimiter } = require('./middleware');
const cors =require('cors')
require('dotenv').config();

router.use(cors())

router.post('/getlike',(req,res)=>{
    
    let variable={}
    if(req.body.videoId){
        variable = {videoId:req.body.videoId}
    }else{
        variable = {commentId:req.body.commentId}
    }

    like.find(variable).exec((err,likeInfo)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, likeInfo})
    })
})

router.post('/getdislike',(req,res)=>{
    
    let variable={}
    if(req.body.videoId){
        variable = {videoId:req.body.videoId}
    }else{
        variable = {commentId:req.body.commentId}
    }

    dislike.find(variable).exec((err,dislikeInfo)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, dislikeInfo})
    })
})


router.post('/uplike',(req,res)=>{
    
    let variable={}
    if(req.body.videoId){
        variable = {videoId:req.body.videoId, userId: req.body.userId}
    }else{
        variable = {commentId:req.body.commentId, userId: req.body.userId}
    }
    console.log(variable)
    const likeSave = new like(variable) 
    likeSave.save((err,result)=>{
        if(err) return res.status(400).send(err)
        dislike.findOneAndDelete(variable).exec((err,findresult)=>{
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true})
        })

    })

})


router.post('/downlike',(req,res)=>{
    
    let variable={}
    if(req.body.videoId){
        variable = {videoId:req.body.videoId, userId: req.body.userId}
    }else{
        variable = {commentId:req.body.commentId, userId: req.body.userId}
    }

    like.findOneAndDelete(variable).exec((err,result)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true})
    })

})



router.post('/updislike',(req,res)=>{
    
    let variable={}
    if(req.body.videoId){
        variable = {videoId:req.body.videoId, userId: req.body.userId}
    }else{
        variable = {commentId:req.body.commentId, userId: req.body.userId}
    }

    const dislikeSave = new dislike(variable) 
    dislikeSave.save((err,result)=>{
        if(err) return res.status(400).send(err)
        like.findOneAndDelete(variable).exec((err,findresult)=>{
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true})
        })

    })

})


router.post('/downdislike',(req,res)=>{
    
    let variable={}
    if(req.body.videoId){
        variable = {videoId:req.body.videoId, userId: req.body.userId}
    }else{
        variable = {commentId:req.body.commentId, userId: req.body.userId}
    }

    dislike.findOneAndDelete(variable).exec((err,result)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true})
    })

})

module.exports = router;