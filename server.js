const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello blog!!')
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