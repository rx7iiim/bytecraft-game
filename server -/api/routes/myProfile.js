const express= require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User=require("../models/user");
const checkaurh = require("../midlleware/checkaurh");
router.get("/",checkaurh,(req,res,next)=>{
    const now = new Date();
    const fiveHoursInMs = 5 * 60 * 60 * 1000;
   
    let response=null
    const userEmail=req.userData.email;
    User.findOne({email:userEmail}).exec().then(resp=>{
        response={
            username:resp.userName,
            score:resp.points,
            time_remaining:Math.ceil((fiveHoursInMs -  (now - resp.lastRequestTime)) / (60 * 1000)),
        }
        res.status(200).json(response)

    }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})
module.exports=router;