const Router = require('express').Router;
const ProductController = require('../controllers/product');

const router = new Router();

const authMiddleware = require('../middleware/auth');

router.post('/add', authMiddleware, ProductController.addToFavorite);
router.get('/', authMiddleware, ProductController.getFavoriteProducts);
router.delete('/delete', authMiddleware, ProductController.deleteFromFavorite);

module.exports = router;
