const Router = require('express').Router;
const ProductController = require('../controllers/product');

const router = new Router();

const authMiddleware = require('../middleware/auth');

router.post('/rate', authMiddleware, ProductController.rateProduct);
router.patch('/rate/update', authMiddleware, ProductController.updateRating);
router.post('/rate/check', ProductController.checkIsRated);

router.get('/rates', ProductController.getProductRatings);
router.get('/rate', ProductController.getProductRating);

module.exports = router;
