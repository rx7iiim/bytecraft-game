const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/login", (req, res, next) => {
  username:req.body.username
  email:req.body.email
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        ( async function (username, email) {
        const randomPicture = await Picture.aggregate([{ $sample: { size: 1 } }]);

        if (randomPicture.length === 0) {
          throw new Error('No pictures found in the database');
        }
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            score:0,
            email:email,
            username:username,
            profileImage:randomPicture[0].url,
            i:0,
          });})
        user
        .save()
        .then(result => {const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id
          },
          process.env.JWT_KEY,
          {
              expiresIn: "30d"
          }
        );
        return res.status(200).json({
          message: "Auth successful",
          token: token
        });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      }else{ const token = jwt.sign(
        {
          email: user[0].email,
          userId: user[0]._id
        },
        process.env.JWT_KEY,
        {
            expiresIn: "30d"
        }
      );
      return res.status(200).json({
        message: "Auth successful",
        token: token
      });
    }
    res.status(401).json({
      message: "Auth failed"
    });})
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;