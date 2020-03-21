const express = require('express')
const router = express.Router()
const comment =require('../models/comment')
const { verifyToken, apiLimiter } = require('./middleware');
const cors =require('cors')

require('dotenv').config();
router.use(cors());

router.post('/save',(req,res)=>{
    const comment_get = new comment(req.body)
    comment_get.save((err,savedcomment)=>{
        if(err) return res.json({success:false,err})

        comment.find({'_id':savedcomment._id}).populate('writer').exec((err,result)=>{
                if(err) return res.json({success:false,err})
                return res.status(200).json({success:true,result})
    })
})
})

router.post('/getAllcomment',(req,res)=>{

        comment.find({'postId':req.body.videoId}).populate('writer').exec((err,commentAll)=>{
                if(err) return res.json({success:false,err})
                return res.status(200).json({success:true,commentAll})
    })

})


module.exports = router;