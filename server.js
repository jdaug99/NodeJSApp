require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Welcome to: BOOSTER ENGINE')
})

// Read all Products
app.get('/products', async(req, res) => {
    try {

        const products = await Product.find({})
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Read Product by ID
app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Create a Product
app.post('/products', async(req, res) => {
    try {

        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// Update a Product
app.put('/products/:id', async(req, res) => {
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
app.delete('/products/:id', async(req, res) => {
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

mongoose.set("strictQuery", false)
mongoose.
connect(MONGO_URL)
.then(() => {
    console.log('MONGODB CONNECTION ESTABLISHED')
    app.listen(PORT, ()=> {
        console.log(`BOOSTER ENGINE IS LIVE ON PORT ${PORT}`)
    })    
}).catch((error) => {
    console.log(error)
})