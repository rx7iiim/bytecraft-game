const checkaurh = require("../midlleware/checkaurh");
const express = require("express");
const router = express.Router();

const user=require("../models/user")
const fruits=require("../models/fruits")


const fruitsurl = [
  "Hello World",
  "Random String 1",
  "Something Cool",
  "Interesting Fact",
  "Did you know?"
];

router.patch('/getfruit', checkaurh, async (req, res) => {
  try {
    const userEmail = req.userData.email;

    let user = await User.findOne({ email: userEmail });

    if (!user) {

    res.status(500).json({error:"your session is not there anymore please roh t9ra"})
    }else{
   
    const now = new Date();
    const fiveHoursInMs = 5 * 60 * 60 * 1000; 

    if (user.lastRequestTime) {
      const timeDiff = now - user.lastRequestTime; 
      if (timeDiff < fiveHoursInMs) {
      
        const remainingTime = Math.ceil((fiveHoursInMs - timeDiff) / (60 * 1000)); 
        return res.status(429).json({
          message: `Please wait ${remainingTime} more minutes before making another request.`
        });
      }else
      { 
    const 
    randomurl =(function () {
        return fruitsurl[Math.floor(Math.random() * randomStrings.length)];
      })();
      const ex = await User.findOne({
        _id: userId,
        pictures: { $in: [randomurl] }
      });
  
      while(ex) {
        const 
        randomurl =(function () {
            return fruitsurl[Math.floor(Math.random() * randomStrings.length)];
          })();
          const ex = await User.findOne({
            _id: userId,
            pictures: { $in: [randomurl] }
          });
      }
    user.updateOne({ _id: req.userData._id }, { $push:{users:randomurl}})
    await user.save();
    await user.
  findOne({ email:req.userData.email }).
  populate('pictures').
  exec()
    .then(result => {
      res.status(200).json({
          message: 'user collection updated',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

fruits.updateOne({ url:randomurl }, { $push:{pictures:req.userData._id}})
await fruits.save();
await fruits.
findOne({ url:randomurl }).
populate('users').
exec()
.then(result => {
  res.status(200).json({
      message: 'user collection updated',
  });
})
.catch(err => {
  console.log(err);
  res.status(500).json({
    error: err
  });
})
const scoretoadd=pictures.findOne({url:randomurl})
const usertoadd=user.findOne({email:userEmail})
const add=usertoadd.points+scoretoadd.score
user.updateOne({ _id: req.userData._id }, { $set:{points:add}})
await user.save();
      }
    }
    }
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports=router;