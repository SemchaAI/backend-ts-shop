const { Schema, model } = require('mongoose');
// mongoDb create id automatically
const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CartProduct',
    },
  ],
});
const CartModel = model('Cart', CartSchema);
// module.exports.Cart = CartModel;

const CartProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
});

const CartProduct = model('CartProduct', CartProductSchema);
// module.exports.CartProduct = CartProduct;

module.exports = {
  CartModel,
  CartProduct,
};
