const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../components/user/model')
const Role = require('../components/auth/role')
const response = require('../network/response')

exports.verifyToken = async (req, res, next)=>{
    try {
        const token = req.headers['auth']

        console.log(token)

        
        if(!token) return response.error(req, res, 400, 'No Token Provided', 'No se recibio un token valido')

        const decoded = jwt.verify(token, process.env.SECRET)

        req.userId = decoded.id

        const userFound = await User.findById(req.userId, {pass: 0})

        if(!userFound) return response.error(req, res, 400, 'No User Found', 'Usuario no encontrado')

        next()
    } catch (error) {
        response.error(req, res, 400, 'Unauthorized', error)
    }
}

exports.isAdmin = async(req, res, next)=>{
    const userFound = await User.findById(req.userId)
    const rolesFound = await Role.find({_id: {$in: userFound.roles}})

    for(let i=0; i<rolesFound.length; i++){
        if(rolesFound[i].name === 'admin'){
            next()
            return
        }
    }
    return response.error(req, res, 400, 'Requiere permisos de Administrador', 'Require Admin Role')
}

exports.isUser = async(req, res, next)=>{
    const userFound = await User.findById(req.userId)
    const rolesFound = await Role.find({_id: {$in: userFound.roles}})

    for(let i=0; i<rolesFound.length; i++){
        if(rolesFound[i].name === 'user'){
            next()
            return
        }
    }
    return response.error(req, res, 400, 'Es necesario registrarse', 'Require Register')
}

exports.checkHeader = (req, res, next)=>{
    const token = req.session.token
    console.log(token)
    res.header('Content-Type', 'text/html');
    res.header('auth', token)
    console.log(req.headers['auth'])
    next()
}