const express= require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const pfps=["https://drive.google.com/file/d/1f9gMhTR-izYWt0xOLgURyfErjM8vng2_/view?usp=drive_link","https://drive.google.com/file/d/1Ks0jL4LkOC-So1CmpV8wbj_n_GChXkl7/view?usp=drive_link",
  "https://drive.google.com/file/d/1rtgZKJPWP_vc5_RF2OU9KQK3n1DQOt0y/view?usp=drive_link","https://drive.google.com/file/d/1b8dv_fht5JGGMfIu33iqqk-IElTcy4w1/view?usp=drive_link",
  "https://drive.google.com/file/d/1xhuEYlbtaufUsto9mbioOuyQVslhhkDN/view?usp=drive_link","https://drive.google.com/file/d/1hjp_3x9gpyfsQLvRPyV-_a9kp9XspZ2s/view?usp=drive_link","https://drive.google.com/file/d/1yXXKt0-sJSgWSP2MklYfCXiVDDzVd6lM/view?usp=drive_link",
  "https://drive.google.com/file/d/13dYTDQXq9Z5BgYnLq4EyZED52-gxTch1/view?usp=drive_link","https://drive.google.com/file/d/16KrbfU2FxveGDzKW85wQkt_PBBDsxTL2/view?usp=drive_link",
  "https://drive.google.com/file/d/1vD6IEeqP0otxrKjLriB3f9eA5QasJNc2/view?usp=drive_link","https://drive.google.com/file/d/12flSQn0NvG3klTsS4-hfBEmfUwD4QQ69/view?usp=drive_link"
]

router.post("/signup",(req,res,next)=>{
  const useername=req.body.username;
  const email=req.body.email;
  User.findOne({ email: req.body.email })
  .exec()
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Mail exists"
      });
    } else {
      const randomPicture = pfps.aggregate([{ $sample: { size: 1 } }]);

      if (randomPicture.length === 0) {
        throw new Error('No pictures found in the database');
      }
      const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email:req.body.email,
          username:req.body.username,
          password:req.body.password,
          profileImage:randomPicture,

        });
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
   }
}) })

router.post("/login", (req, res, next) => {
  username:req.body.username
  email:req.body.email
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {return res.status(401).json({
          message: "Auth failed"})
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