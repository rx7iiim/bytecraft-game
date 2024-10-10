const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
    ,userName:{type:String,required:true},score:{type:Number},
    profileImage: { type: Schema.Types.ObjectId, ref: 'pfp' },
    pictures: [[{ type: Schema.Types.ObjectId, ref: 'fruits' }],{type:Number,default:0}],
});

module.exports = mongoose.model('User', userSchema);