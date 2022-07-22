const express = require('express')
const router = express.Router()
const {checkHeader, verifyToken, isAdmin} = require('../../middlewares/authJwt')
const {login, carrito, settings} = require('./controller')

router.get('/', login)
router.get('/carrito', checkHeader, verifyToken, carrito);
router.get('/settings', checkHeader, verifyToken, isAdmin, settings)

module.exports = router