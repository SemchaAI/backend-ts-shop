const Router = require('express').Router;

const router = new Router();
const brandController = require('../controllers/brand');

router.post('/', brandController.create);
router.get('/', brandController.get);

module.exports = router;
