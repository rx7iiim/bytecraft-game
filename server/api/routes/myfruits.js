const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const fruits = require("../models/fruits");
const checkaurh = require("../midlleware/checkaurh");

router.get("/",checkaurh, (req, res, next) => {
  const userId = req.userData.userId;
    fruits.find({ users: { $elemMatch: { $eq: userId } } })
      .select()
      .exec()
      .then(docs => {
        if (docs.length <= 0) {
            res.status(404).json({
                message: "you don't have any fruit yet"
            });
}else{
        const response = {
          count: docs.length,
          url: docs.map(doc => {
            return {
              url: doc.url,
              
            };
          })
        }}; res.status(200).json(response);
     
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
module.exports = router;