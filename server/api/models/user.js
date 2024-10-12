const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
    ,userName:{type:String,required:true},score:{type:Number,default:0},
    profileImage: { type:String },
    pictures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'fruits' }],
    lastRequestTime: { type: Date, default: null },
    points:Number
});

module.exports = mongoose.model('User', userSchema);