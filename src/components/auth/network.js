const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/', (req, res)=>{
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <form action="/auth" method="post">
        User: <input type="text" name="username">
        Pass: <input type="text" name="pass">
        <input type="submit" value="Iniciar Sesión">
    </form>
</body>
</html>
    `)
})

router.post('/', (req, res)=>{
    const {username, pass} = req.body

    // VERIFICAR EN BD SI EXISTEN USER Y PASS

    const user = {username: username}
    const accessToken = generateAccesstoken(user)

    res.header('auth', accessToken).json({
        message: 'Usuario autenticado',
        token: accessToken
    })
})

function generateAccesstoken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}

module.exports = router