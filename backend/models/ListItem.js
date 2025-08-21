const mongoose = require('mongoose');

const ListItemSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent', // This links the item to an agent
    required: true,
  },
});

module.exports = mongoose.model('ListItem', ListItemSchema);    