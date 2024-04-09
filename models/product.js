const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  img: { type: String, required: true },
  description: { type: String, required: true },
  cnt: { type: Number, default: false },
  typeId: { type: Schema.Types.ObjectId, ref: 'Type' },
  brandId: { type: Schema.Types.ObjectId, ref: 'Brand' },
  thumbnails: { type: Schema.Types.ObjectId, ref: 'Thumbnail' },
  info: [{ type: Schema.Types.ObjectId, ref: 'Info' }],
});

module.exports = model('Product', ProductSchema);

const TypeSchema = new Schema({
  name: { type: String, unique: true, required: true },
});

module.exports.Type = model('Type', TypeSchema);

const BrandSchema = new Schema({
  name: { type: String, unique: true, required: true },
});

module.exports.Brand = model('Brand', BrandSchema);

const ThumbnailsSchema = new Schema({
  img: [{ type: String, required: false }],
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
});

module.exports.Thumbnail = model('Thumbnail', ThumbnailsSchema);

const InfoSchema = new Schema({
  title: { type: String, required: true, unique: false },
  description: { type: String, required: true, unique: false },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
});

module.exports.Info = model('Info', InfoSchema);
