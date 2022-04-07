const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.post('/myventa', (req, res)=>{
    console.log(req.body)
})

router.post('/:userId/venta', (req, res)=>{
    controller.addVenta(req)
    .then((fullVenta)=>{
        response.success(req, res, 202, fullVenta)
    })
    .catch(e=>{
        response.error(req, res, 400, 'Error interno', e)
    })
})

router.get('/', (req, res)=>{
    controller.getVenta()
    .then((data)=>{
        response.success(req, res, 200, data)
    })
    .catch(e=>{
        response.error(req, res, 400, 'Error interno', e)
    })
})

module.exports = router