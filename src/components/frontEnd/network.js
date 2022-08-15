const express = require('express')
const router = express.Router()
const {verifyToken, isAdmin} = require('../../middlewares/authJwt')
const {login, logout, carrito, settings, productos, usuarios} = require('./controller')

router.get('/', login)
router.get('/logout', logout)
router.get('/carrito', verifyToken, carrito);
router.get('/settings', verifyToken, isAdmin, settings)
router.get('/productos_frontEnd', verifyToken, isAdmin, productos)
router.get('/usuarios_frontEnd', verifyToken, isAdmin, usuarios)

module.exports = router