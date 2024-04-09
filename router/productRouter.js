const Router = require('express').Router;
const ProductController = require('../controllers/product');

const router = new Router();

const authMiddleware = require('../middleware/auth');

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);

router.post('/', authMiddleware, ProductController.createProduct);

router.post('/add', authMiddleware, ProductController.addToCart);
router.get('/cart', authMiddleware, ProductController.getCartProducts);

module.exports = router;
