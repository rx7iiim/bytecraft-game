const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const fruits = require("../models/fruits");
const checkaurh = require("../midlleware/checkaurh");

router.get("/",checkaurh, (req, res, next) => {
  let response = null;
  const userId= req.userData.userId;
  fruits.find({ users: { $in: [userId] } })
      .select("score url name")
      .exec()
      .then(docs => {
        response ={
          count: docs.length,
          fruits: docs.map(doc => {
            return {
              url: doc.url,
              points:doc.score,
              name:doc.name,
            };
          })
        }
        res.status(200).json(response);
     
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
module.exports = router;