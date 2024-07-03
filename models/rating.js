const { Schema, model } = require('mongoose');

const RatingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: Schema.Types.String,
    ref: 'User',
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  message: {
    type: String,
    required: false,
  },
  rate: {
    type: Number,
    required: true,
  },
});

module.exports = model('Rating', RatingSchema);
