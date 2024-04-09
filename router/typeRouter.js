const Router = require('express').Router;

const router = new Router();
const typeController = require('../controllers/type');
const role = require('../middleware/role');

router.post('/', role('ADMIN'), typeController.create);
router.get('/', typeController.get);

module.exports = router;
