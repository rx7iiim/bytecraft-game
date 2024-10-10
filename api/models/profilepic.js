
const mongoose = require('mongoose');

const pfpSchema = new mongoose.Schema({
  url: String,
  userss: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
  });
module.exports = mongoose.model('pfp', pfpSchema);