const mongoose = require('mongoose');

const fruitsSchema = mongoose.Schema({
    url: { type:String , required: true },
    score:Number,
    users: [{ type:mongoose.Schema.Types.ObjectId, ref: 'user' }],
    name:{type:String,required:true,unique:true}

});

module.exports = mongoose.model('fruits', fruitsSchema);