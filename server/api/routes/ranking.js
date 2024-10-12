const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const user =require("../models/user");
const checkaurh = require("../midlleware/checkaurh");

  router.get ("/", checkaurh,(req, res, next) => {
    let topUsers=null
        const userEmail = req.userData.email;
    user.find()
    .sort({ points: -1 })                      
    .limit(10)                                
    .select('userName points').exec().then(docs=>{
      topUsers={
        count: docs.length,
        users: docs.map(doc => {
          return {
            username:doc.userName,
            score:doc.points,
          };
    })}
    res.status(200).json(topUsers)
 
      })})
module.exports = router;