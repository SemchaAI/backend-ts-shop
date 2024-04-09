const Router = require('express').Router;
const UserController = require('../controllers/user');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 32 }),
  UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);

router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);

router.get('/test', authMiddleware, UserController.test);

router.get('/all', authMiddleware, UserController.getUsers);

module.exports = router;
