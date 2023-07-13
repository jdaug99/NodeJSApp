const express = require('express')
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')

const router = express.Router()

// Read all Products
router.get('/', getProducts)

// Read Product by ID
router.get('/:id', getProduct)

// Create a Product
router.post('/', createProduct)

// Update a Product
router.put('/:id', updateProduct)

// Delete a Product
router.delete('/:id', deleteProduct)


module.exports = router;