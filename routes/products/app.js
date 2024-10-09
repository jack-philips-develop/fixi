const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productsController');

router.get('/', productController.getProducts);               // Get All Products
router.get('/:id', productController.getProductById);         // Get Product by ID
router.post('/', productController.createProduct);            // Create New Product
router.patch('/:id', productController.updateProduct);        // Update Product by ID
router.delete('/:id', productController.deleteProduct);       // Delete Product by ID

module.exports = router;
