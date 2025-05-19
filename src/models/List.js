const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: {
    type: String,
    enum: ['blue', 'red', 'green', 'purple', 'orange'],
    default: 'blue',
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('List', listSchema);