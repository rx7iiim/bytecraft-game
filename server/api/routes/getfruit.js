const checkaurh = require("../midlleware/checkaurh");
const express = require("express");
const router = express.Router();

const User=require("../models/user")
const fruits=require("../models/fruits")


const fruitsurl = [
  "Hello World",
  "Random String 1",
  "Something Cool",
  "Interesting Fact",
  "Did you know?"
];

router.patch('/', checkaurh, (req, res,next) => {
    const userEmail = req.userData.email;
    console.log(userEmail)

    const user =  User.findOne({ email:userEmail});

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
        process.exit(1);
       }}
    const 
    randomurl =fruitsurl[Math.floor(Math.random() * fruitsurl.length)];
    if (user.pictures){
      const ex = user.pictures.some(picture => picture.url === randomurl);
  
      while(ex) {
        const 
        randomurl =fruitsurl[Math.floor(Math.random() * fruitsurl.length)];
          const ex = user.pictures.some(picture => picture.url === randomurl);
      }}
      console.log("iam here")

fruits.updateOne({ url:randomurl }, { $push:{pictures:req.userData._id}})
 fruits.
findOne({ url:randomurl }).
populate('users').
exec().then(re=>{
  console.log("true")
}).catch(err=>{
  console.log("err")
});

const scoretoadd=fruits.findOne({url:randomurl})
const usertoadd=user.findOne({email:userEmail})
const add=usertoadd.points+scoretoadd.score
console.log(add)
user.updateOne({ email: userEmail }, {$set:{points: add, lastRequestTime: now}}, { $push:{users:randomurl}})
user.findOne({email:userEmail}).populate("pictures").exec().then(result => {
  res.status(200).json({
      message: 'user collection updated',
  });
}).catch(err => {
  console.log(err);
  res.status(500).json({
    error: err
  });
})


    }
    });
router.post("/",(req,res,next)=>{
  const fruit=new fruits({
    url:req.body.url,
    score:req.body.score,
  })
  fruit.save().then(res=>{
    res.status(200).json({
      message:"my code is working idk why",
      res:res
    })
  }).catch(err=>{
    res.status(409).json({err:err})
  })
})
module.exports=router;