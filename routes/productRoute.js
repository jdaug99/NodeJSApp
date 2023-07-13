const express = require('express')
const Product = require('../models/productModel')

const router = express.Router()

// Read all Products
router.get('/products', async(req, res) => {
    try {

        const products = await Product.find({})
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Read Product by ID
router.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Create a Product
router.post('/products', async(req, res) => {
    try {

        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// Update a Product
router.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        
        // If Product not found in db
        if(!product) {
            
            res.status(404).json({message: `No product found with ID ${id}`})
        }
        //Else return updated Product
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body)
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Delete a Product
router.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        
        // If Product not found in db
        if(!product) {
            
            res.status(404).json({message: `No product found with ID ${id}`})
        }
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;