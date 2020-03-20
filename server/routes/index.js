const express = require('express');
const router = express.Router()
const user =require('../models/user')
const cors = require('cors');


router.use(cors());
router.get('/',(req,res)=>{
    res.send('hello')
})


module.exports = router;