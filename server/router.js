const router = require('express').Router();

const authController = require('./controllers/authController.js');
const productController = require('./controllers/productController.js');
const commentController = require('./controllers/commentController.js');
const orderController = require('./controllers/orderController.js');

router.use('/auth', authController);
router.use('/product', productController);
router.use('/comments', commentController)
router.use('/cart', orderController);

module.exports = router;