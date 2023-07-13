require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const productRoute = require('./routes/productRoute')

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api', productRoute)

app.get('/', (req, res) => {
    res.send('Welcome to: BOOSTER ENGINE')
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