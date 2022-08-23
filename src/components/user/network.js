const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()
const {verifyToken, isAdmin} = require('../../middlewares/authJwt')
const {checkRolesExisted, checkDuplicateUserOrMail} = require('../../middlewares/verifySignup')

router.get('/', (req, res)=>{
    controller.getUsers()
    .then((usersList)=>{
        response.success(req, res, 200, usersList)
    })
    .catch(e =>{
        response.error(req, res, 400, 'Error interno', e)
    })
})

router.post('/', checkRolesExisted, checkDuplicateUserOrMail, (req, res)=>{
    controller.addUser(req.body)
    .then(data=>{
        response.success(req, res, 200, 'Informacion Registrada!', data)
    })
    .catch(e=>{
        response.error(req, res, 400, 'Error al intentar registrar un nuevo usuario', e)
    })
})

router.patch('/:idUser', controller.updateUserById)

router.delete('/:idUser', controller.deleteUser)




module.exports = router