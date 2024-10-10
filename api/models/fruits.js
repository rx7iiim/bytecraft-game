const mongoose = require('mongoose');

const fruitsSchema = mongoose.Schema({
    url: { type: string , required: true },
    quantity: { type: Number, default: 1 },
    score:Number,
});

module.exports = mongoose.model('fruits', fruitsSchema);