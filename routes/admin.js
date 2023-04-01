const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:editId',adminController.editAddProduct)

router.post('/edit-product/:editId',adminController.addEditProduct)

router.post('/delete-product/:deleteId',adminController.deleteProduct)

module.exports = router;
