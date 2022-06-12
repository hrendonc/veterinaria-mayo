const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')
const accessToken = require('../../components/auth/validarTokens')


router.post('/', (req, res)=>{
    controller.addVenta(req)
    .then((fullVenta)=>{response.success(req, res, 202, fullVenta)})
    .catch(e=>{response.error(req, res, 400, 'Error interno', e)})
})

router.get('/', (req, res)=>{
    accessToken.validar(req)
    controller.getVenta()
    .then((data)=>{response.success(req, res, 200, data)})
    .catch(e=>{response.error(req, res, 400, 'Error interno', e)})
})

module.exports = router