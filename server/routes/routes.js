const express = require('express')
const { signUp, login, isAuth } = require('../controllers/auth')

const router = express.Router()

router.post('/login', login)

router.post('/signup', signUp)

router.post('/private', isAuth)

router.get('/public', (request, response, next) => {
    response.status(200).json({ message: 'Here is your public resource' })
})

router.use('/', (request, response, next) => {
    response.status(404).json({ error: '404 Not Found' })
})

module.exports = router