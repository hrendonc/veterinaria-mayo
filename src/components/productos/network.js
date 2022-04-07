const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.post('/', (req, res)=>{
    console.log(req.body)
    controller.addProducto(req.body)

    .then((fullProducto)=>response.success(req, res, 200, fullProducto))
    .catch(e=>response.error(req, res, 400, 'Error interno', e))
})

router.get('/', (req, res)=>{
    controller.getProducto()
    .then((data)=>{
        response.success(req, res, 200, data)
    })
    .catch(e=>{
        response.error(req, res, 400, 'Error interno', e)
    })
})

module.exports = router