const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop_mongooes');
const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:id', shopController.productDetails);

router.get('/cart', shopController.getCart);

router.post('/add-to-cart',shopController.addcart)
router.get('/orders', shopController.getOrders);

router.get('/checkout/:amount', shopController.getCheckout);

router.post('/cart/delete-cart/:id',shopController.deletecart)
module.exports = router;
