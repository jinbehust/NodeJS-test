const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoriteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    dishes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'dishes',
    }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('favorites', favoriteSchema);
