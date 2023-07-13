require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/products', productRoute)

app.get('/', (req, res) => {
    res.send('Welcome to Booster\'s Product API (B-PAPI)')
})

app.use(errorMiddleware)

mongoose.set("strictQuery", false)
mongoose.
connect(MONGO_URL).then(() => {    
    console.log('DATABASE CONNECTED')

    app.listen(PORT, ()=> {        
        console.log(`B-PAPI LIVE ON PORT: ${PORT}`)
    })    
}).catch((error) => {    
    console.log(error)    
})