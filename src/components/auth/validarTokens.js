const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const response = require('../../network/response')

function validateToken(req, res, next) {
    const accessToken = req.headers['auth']
    if(!accessToken)res.send('Acceso denegado!')

    jwt.verify(accessToken, process.env.SECRET, (err, user)=>{
        if(err){
            res.send('Acceso denegado, Token expirado o incorrecto')
            response.error(req, res, 400, 'Error al crear Refresh Token', error)
        }else{
            next()
        }
    })
}

module.exports = {
    validar: validateToken
}