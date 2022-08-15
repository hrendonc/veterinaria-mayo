const express = require('express')
const router = express.Router()
const {verifyToken, isAdmin} = require('../../middlewares/authJwt')
const {login, logout, carrito, settings, productos, usuarios} = require('./controller')

router.get('/', login)
router.get('/logout', logout)
router.get('/carrito', carrito);
router.get('/settings', settings)
router.get('/productos_frontEnd', productos)
router.get('/usuarios_frontEnd', usuarios)

module.exports = router