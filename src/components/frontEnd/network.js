const express = require('express')
const router = express.Router()
const {setHeader, verifyToken, isAdmin} = require('../../middlewares/authJwt')
const {login, carrito, settings} = require('./controller')

router.get('/', login)
router.get('/carrito', setHeader, verifyToken, carrito);
router.get('/settings', setHeader, verifyToken, isAdmin, settings)

module.exports = router