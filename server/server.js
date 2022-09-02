const express = require('express')
const sequelize = require('sequelize')
const routes = require('./routes/routes')
const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use((_, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    response.setHeader('Access-Control-Allow-HEADERS', 'Content-Type, Authorization')
    
    next()
})

app.use(routes)

sequelize.sync()

app.listen((5000), () => {
    console.log('Server is running on port 5000')
})
