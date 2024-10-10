const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    url: String,
    description: String,
  });

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
    ,userName:{type:String,required:true},score:{type:Number},
    profileImage: { type: String, required: true },
    pictures: [pictureSchema],
});

module.exports = mongoose.model('User', userSchema);