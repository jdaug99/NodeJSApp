const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

// Read all Products
const getProducts = asyncHandler(async(req, res) => {
    try {

        const products = await Product.find({})
        res.status(200).json(products)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// Read Product by ID
const getProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// Create a Product
const createProduct = asyncHandler(async(req, res) => {
    try {

        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

//Update a Product
const updateProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        
        // If Product not found in db
        if(!product) {
            res.status(404)
            throw new Error(`No product found with ID ${id}`)
        }
        //Else return updated Product
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body)
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// Delete a Product
const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        
        // If Product not found in db
        if(!product) {
            res.status(404)
            throw new Error(`No product found with ID ${id}`)
        }
        res.status(200).json(product)

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}