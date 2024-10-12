const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const user =require("../models/user");
const checkaurh = require("../midlleware/checkaurh");

  router.get ("/", checkaurh,(req, res, next) => {
        const userEmail = req.userData.email;
    user.find()
    .sort({ score: -1 })                      
    .limit(9)                                
    .select('name score');

  console.log('Top 9 users:', topUsers);
 
   const myscore=user.findOne({email:userEmail}).points;
   return res.status(200).json({top9:topUsers,yours:myscore});  
      })
module.exports = router;