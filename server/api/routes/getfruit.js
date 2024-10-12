const checkaurh = require("../midlleware/checkaurh");
const express = require("express");
const router = express.Router();

const User=require("../models/user")
const fruits=require("../models/fruits")


const fruitsurl = [
  "https://drive.google.com/file/d/1FW-At87YHB0UKQJ3_z-nwEeO82JXDzsR/view?usp=drive_link",
  "https://drive.google.com/file/d/18dRnLL9AVJVRAVhF9FB_sY8v8Gc2FCJi/view?usp=drive_link",
  "https://drive.google.com/file/d/1w0TpayNMmk6LzMkqP9OeKSsuLM25opSo/view?usp=drive_link"
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
    console.log(randomurl)
    if (user.pictures){
      const ex = user.pictures.some(picture => picture.url === randomurl);
  
      while(ex) {
        const 
        randomurl =fruitsurl[Math.floor(Math.random() * fruitsurl.length)];
          const ex = user.pictures.some(picture => picture.url === randomurl);
      }}
      console.log("iam here")

fruits.updateOne({ url:randomurl }, { $push:{pictures:req.userData.email}})
 fruits.
findOne({ url:randomurl }).
populate('users').
exec().then(re=>{
  console.log("true")
}).catch(err=>{
  console.log("err")
});

async function updateUserScore(userEmail, randomurl) {
  try {
    const scoretoadd = await fruits.findOne({ url: randomurl });
    const usertoadd = await user.findOne({ email: userEmail });

    if (!scoretoadd) {
      console.log('No fruit found with the specified URL.');
      return;
    }

    if (!usertoadd) {
      console.log('No user found with the specified email.');
      return;
    }

    const add = usertoadd.points + scoretoadd.score;
    // Now you can use the 'add' value to update the user's score or for other operations
    console.log('New score:', add);
    
    // Example of updating the user's points
    await user.updateOne(
      { email: userEmail },
      { $set: { points: add ,lastRequestTime: now } }, { $push:{users:randomurl}}
    );
  } catch (error) {
    console.error('Error updating user score:', error);
  }
}

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