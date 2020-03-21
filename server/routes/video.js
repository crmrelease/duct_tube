const express = require('express')
const router = express.Router()
const cors = require('cors');
//onst video =require('../models/video')
const multer = require('multer')
//const ffmpeg = require('fluent-ffmpeg');
const video =require('../models/video')
const subscribe =require('../models/subscribe')



router.use(cors());
//ffmpeg.setFfmpegPath("C:/ffmpeg/ffmpeg-4.2.2-win64-static/bin/ffmpeg.exe")
let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`);
    },
    fileFilter:(req,file,cb)=>{
        const ext = path.extname(file.originalname)
        if(ext!=='.mp4'){
            return cb(res.status(400).end('mp4만 올리세여'),false);
        }
        cb(null,true)
    }
})

let storage_thumbnail = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload_thumbnail/');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`);
    },
    fileFilter:(req,file,cb)=>{
        const ext = path.extname(file.originalname)
        if(ext!=='.mp4'){
            return cb(res.status(400).end('png만 올리세여'),false);
        }
        cb(null,true)
    }
})

const upload = multer({storage:storage}).single("video_file");
const upload_thumbnail = multer({storage:storage_thumbnail}).single("thumbnail_file");

router.post('/uploadfile',(req,res)=>{
    upload(req,res,err=>{
        if(err){
            return res.json({success:false,err})
            }
        return res.json({success:true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })
})

router.post('/thumbnail', (req, res) => {
    upload_thumbnail(req,res,err=>{
        if(err){
            return res.json({success:false,err})
            }
        return res.json({success:true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })

});

router.post('/uploadvideo', (req, res) => {
    
    const uploadVideo = new video(req.body)
    uploadVideo.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        res.status(200).json({success:true})
    })
});


router.get('/getVideo', (req, res) => {
    
    video.find().populate('writer')
    .exec((err,videos)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, videos})
    })
    
});

router.post('/getVideoInfo', (req, res) => {
    
    video.findOne({"_id":req.body.videoId})
    .populate('writer')
    .exec((err,videoDetailInfo)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, videoDetailInfo})
    })
    
});

router.post('/subvideo',(req,res)=>{
        subscribe.find({'userFrom':req.body.userFrom}).exec((err,subInfo)=>{
        if(err) return res.status(400).send(err)
        let subInfos=[];
        subInfo.map((key,index)=>{
            subInfos.push(key.userTo)
        })
        video.find({'writer':{$in:subInfos}}).populate('writer').exec((err,subVideo)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true, subVideo})
    })
    
    })

})

module.exports = router;