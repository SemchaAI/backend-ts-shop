const Router = require('express').Router;

const router = new Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const cartRouter = require('./cartRouter');
const favoriteRouter = require('./favoriteRouter');
const rateRouter = require('./rateRouter');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/rating', rateRouter);
router.use('/brand', brandRouter);
router.use('/type', typeRouter);
router.use('/cart', cartRouter);
router.use('/favorite', favoriteRouter);

module.exports = router;
