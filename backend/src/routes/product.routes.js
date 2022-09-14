const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/products', productController.createProduct);
router.get('/products', productController.listAllProducts);
router.get('/products/:id', productController.findProductById);
router.put('/products/:id', productController.updateProductById);
router.delete('/products/:id', productController.deleteProductById);
router.get('/productssearch', productController.findProductBySearch);

module.exports = router;