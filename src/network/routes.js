const express = require('express')
const user = require('../components/user/network')
const productos = require('../components/productos/network')
const venta = require('../components/ventas/network')
const auth = require('../components/auth/network')
const frontEnd = require('../components/frontEnd/network')

// Creamos un servidor de rutas
const routes = function (server) {
    server.use('/', frontEnd)
    server.use('/user', user)
    server.use('/productos', productos)
    server.use('/venta', venta)
    server.use('/auth', auth)
}

module.exports = routes