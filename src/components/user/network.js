const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()
const {verifyToken, isAdmin} = require('../../middlewares/authJwt')
const {checkRolesExisted, checkDuplicateUserOrMail} = require('../../middlewares/verifySignup')

router.get('/', verifyToken, isAdmin, (req, res)=>{
    controller.getUsers()
    .then((usersList)=>{
        response.success(req, res, 200, usersList)
    })
    .catch(e =>{
        response.error(req, res, 400, 'Error en GET', e)
    })
})

router.post('/', verifyToken, isAdmin, checkRolesExisted, checkDuplicateUserOrMail, (req, res)=>{
    controller.addUser(req.body)
    .then(data=>{
        response.success(req, res, 200, 'Informacion Registrada!', data)
    })
    .catch(e=>{
        response.error(req, res, 400, 'Error al intentar registrar un nuevo usuario', e)
    })
})

router.patch('/:idUser', verifyToken, isAdmin, controller.updateUserById)




module.exports = router