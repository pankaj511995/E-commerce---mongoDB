const path = require('path');

const express = require('express');
const adminMongoos=require('../controllers/admin_mongoose')

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminMongoos.getAddProduct);

// /admin/products => GET
router.get('/products', adminMongoos.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminMongoos.postAddProduct);

router.get('/edit-product/:editId',adminMongoos.editAddProduct)

router.post('/edit-product/:editId',adminMongoos.addEditProduct)

router.post('/delete-product/:deleteId',adminMongoos.deleteProduct)

module.exports = router;
