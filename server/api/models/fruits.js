const mongoose = require('mongoose');

const fruitsSchema = mongoose.Schema({
    url: { type: string , required: true },
    score:Number,
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }]

});

module.exports = mongoose.model('fruits', fruitsSchema);