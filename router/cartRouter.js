const Router = require('express').Router;
const ProductController = require('../controllers/product');

const router = new Router();

const authMiddleware = require('../middleware/auth');

router.post('/add', authMiddleware, ProductController.addToCart);
router.get('/', authMiddleware, ProductController.getCartProducts);
router.delete('/delete', authMiddleware, ProductController.deleteFromCart);

module.exports = router;
