const { Schema, model } = require('mongoose');
// mongoDb create id automatically
const FavoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CartProduct',
    },
  ],
});

const FavoriteModel = model('Favorite', FavoriteSchema);

const FavoriteProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  favoriteId: {
    type: Schema.Types.ObjectId,
    ref: 'Favorite',
  },
});

const FavoriteProduct = model('FavoriteProduct', FavoriteProductSchema);
// module.exports.CartProduct = CartProduct;

module.exports = {
  FavoriteModel,
  FavoriteProduct,
};
