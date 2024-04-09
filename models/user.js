const { Schema, model } = require('mongoose');
// mongoDb create id automatically
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  isActivated: { type: Boolean, default: false },
  role: { type: String, default: 'USER' },
  activationLink: String,
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
});

module.exports = model('User', UserSchema);
