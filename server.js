const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Booster API')
})

app.get('/blog', (req, res) => {
    res.send('Hello blog!!')
})

app.get('/products', async(req, res) => {
    try {

        const products = await Product.find({})
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async(req, res) => {
    try {

        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// Update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdandUpdate(id, req.body)
        
        // If product not found in db
        if(!product) {
            
            res.status(404).json({message: `No product found with ID ${id}`})
        }
        //Else return updated product
        const updatedProduct = await Product.findByIdandUpdate(id, req.body)
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://admin:ADMINbooster@boosterapi.s8yahwv.mongodb.net/Booster-API?retryWrites=true&w=majority')
.then(() => {
    console.log('MONGODB CONNECTION ESTABLISHED')
    app.listen(3000, ()=> {
        console.log('BOOSTER ENGINE IS LIVE')
    })    
}).catch((error) => {
    console.log(error)
})