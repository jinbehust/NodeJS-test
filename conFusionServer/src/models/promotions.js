const mongoose = require('mongoose');

const { Schema } = mongoose;

require('mongoose-currency').loadType(mongoose);

const { Currency } = mongoose.Types;

const promotionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    price: {
      type: Currency,
      required: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('promotions', promotionSchema);
