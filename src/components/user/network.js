const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.get('/', (req, res)=>{
    controller.getUsers()
    .then((usersList)=>{
        response.success(req, res, 200, usersList)
    })
    .catch(e =>{
        response.error(req, res, 400, 'Error en GET', e)
    })
})

router.post('/', (req, res)=>{
    controller.addUser(req.body)
    .then(data=>{
        response.success(req, res, 200, 'Informacion Registrada!', data)
    })
    .catch(e=>{
        response.error(req, res, 400, 'Verifica el usuario o password', e)
    })
})

module.exports = router