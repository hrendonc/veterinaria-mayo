const express = require('express')
const router = express.Router()
const {verifyToken, isAdmin} = require('../../middlewares/authJwt')
const {login, logout, carrito, settings, productos} = require('./controller')

router.get('/', login)
router.get('/logout', logout)
router.get('/carrito', verifyToken, carrito);
router.get('/settings', verifyToken, isAdmin, settings)
router.get('/productos_fe', verifyToken, isAdmin, productos)

module.exports = router