const uuid = require('uuid');
const ProductModel = require('../models/product');
const { Info, Thumbnail } = require('../models/product');
const path = require('path');
const ApiError = require('../exceptions/apiError');

class ProductService {
  async createProducts(req) {
    const { title, description, cnt, price, typeId, brandId, info } = req.body;
    console.log(title, description, cnt, price, typeId, brandId, info);
    const { img, ...thumbnails } = req.files;
    let fileName = `${title}-` + uuid.v4() + '.webp';
    img.mv(path.resolve(__dirname, '..', 'static', fileName));

    const product = await ProductModel.create({
      title,
      description,
      img: fileName,
      cnt,
      price,
      typeId,
      brandId,
    });
    if (info) {
      let infoObj = JSON.parse(info);
      infoObj = infoObj.map((i) => {
        Info.create({
          title: i.title,
          description: i.description,
          productId: product._id,
        });
      });
    }

    if (thumbnails) {
      console.log('thumbnails', Object.keys(thumbnails));
      Object.keys(thumbnails).map(async (thumbnail, index) => {
        let fileName = `${title}-${thumbnail}` + uuid.v4() + '.webp';
        thumbnails[thumbnail].mv(
          path.resolve(__dirname, '..', 'static', fileName)
        );
        if (index === 0) {
          await Thumbnail.create({
            img: fileName,
            productId: product._id,
          });
        } else {
          await Thumbnail.updateOne(
            { productId: product._id },
            { $push: { img: fileName } }
          );
        }
      });
    }

    // if (thumbnail0) {
    //   let fileName = `${title}-` + uuid.v4() + '.webp';
    //   thumbnail0.mv(path.resolve(__dirname, '..', 'static', fileName));
    //   Thumbnail.create({
    //     img: fileName,
    //     productId: product._id,
    //   });
    // }
    // if (thumbnail1) {
    //   let fileName = `${title}-` + uuid.v4() + '.webp';
    //   thumbnail1.mv(path.resolve(__dirname, '..', 'static', fileName));
    //   let tmp = await Thumbnail.updateOne(
    //     { productId: product._id },
    //     { $push: { img: fileName } }
    //   );
    //   console.log('thumbnail1');
    //   console.log(tmp.modifiedCount, 'tmp');
    // }
    // if (thumbnail2) {
    //   let fileName = `${title}-` + uuid.v4() + '.webp';
    //   thumbnail2.mv(path.resolve(__dirname, '..', 'static', fileName));
    //   let tmp = await Thumbnail.updateOne(
    //     { productId: product._id },
    //     { $push: { img: fileName } }
    //   );
    //   console.log(tmp.modifiedCount, 'tmp');
    //   console.log('thumbnail2');
    // }
    // console.log(product);
    return { product };
  }
  async getAllProducts(req) {
    let { brandId, typeId, limit, page, title } = req.query;

    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;

    // get total documents in the ProductModel collection
    // 2 requests to db is bad but im front
    let count;
    if (typeId && !title) {
      count = await ProductModel.countDocuments({ typeId: typeId });
    } else if (title && !typeId) {
      let titleReg = new RegExp(title, 'i');
      count = await ProductModel.countDocuments({ title: titleReg });
    } else if (title && typeId) {
      let titleReg = new RegExp(title, 'i');
      count = await ProductModel.countDocuments({
        title: titleReg,
        typeId: typeId,
      });
    } else {
      count = await ProductModel.countDocuments();
    }

    console.log(count, 'count');

    const total = Math.ceil(count / limit);

    let products;
    if (title && typeId) {
      let titleReg = new RegExp(title, 'i');
      products = await ProductModel.find({ title: titleReg, typeId })
        .skip(offset)
        .limit(limit);
    } else if (title && !typeId) {
      let titleReg = new RegExp(title, 'i');
      products = await ProductModel.find({ title: titleReg })
        .skip(offset)
        .limit(limit);
    } else if (!brandId && !typeId) {
      products = await ProductModel.find().skip(offset).limit(limit);
    } else if (brandId && !typeId) {
      products = await ProductModel.find({ brandId }).skip(offset).limit(limit);
    } else if (!brandId && typeId) {
      products = await ProductModel.find({ typeId }).skip(offset).limit(limit);
    } else if (brandId && typeId) {
      products = await ProductModel.find({ brandId, typeId })
        .skip(offset)
        .limit(limit);
    }

    return { products, total, page };

    // const products = await ProductModel.find();
    // return { products };
  }
  async getOneProduct(id) {
    // const product = await ProductModel.findById(id);
    // await product.populate({
    //   path: 'info',
    //   select: 'title description',
    // });
    // .populate('thumbnails')
    // .populate('Info');
    const info = await Info.find({ productId: id });
    // console.log(info);
    const thumbnails = await Thumbnail.findOne({ productId: id });
    console.log(thumbnails);
    const product = await ProductModel.findById(id);
    product.info = info;
    product.thumbnails = thumbnails;
    console.log(product.thumbnails);
    return product;
  }
}

module.exports = new ProductService();
