const User = require('../user/model')
const response = require('../../network/response')
const jwt = require('jsonwebtoken')
const Role = require('./model')
require('dotenv').config()

exports.signUp = async (req, res)=>{
    const {user, pass, email, role} = req.body

    if(!pass || !user || !email) return response.error(req, res, 400, 'No se recibieron los datos esperados', 'Algún dato requerido no fue introducido')

    try {
        const newUser = new User({
            user,
            pass: await User.encryptPass(pass),
            email
        })

        if(role){
            const foundRoles = await Role.find({name: {$in: role}})
            newUser.role = foundRoles._id
        }else{
            const role = await Role.findOne({name: 'user'})
            newUser.role = role._id
        }
    
        const savedUser = await newUser.save()
        const token = jwt.sign({id: savedUser._id}, process.env.SECRET, {expiresIn: '1d'})
    
        res.status(200).json({token})

    } catch (error) {
        console.log(error)
    }    
}

exports.signIn = async (req, res)=>{
    const {email, pass} = req.body

    if(!email || !pass) return response.error(req, res, 400, 'No se recibieron los datos esperados', 'Algún dato requerido no fue introducido')

    const userFound = await User.findOne({email}).populate('role')
    
    if(!userFound) return response.error(req, res, 400, 'Usuario o Contraseña incorrecta', 'User not found')

    const matchPass = await User.comparePass(pass, userFound.pass)

    if(!matchPass) return response.error(req, res, 400, 'Usuario o Contraseña incorrecta', 'Invalid password')

    const token = jwt.sign({id: userFound._id}, process.env.SECRET, {expiresIn: '1d'})

    req.session.user = userFound.user
    req.session.token = token

    response.success(req, res, 200, `Bienvenido ${userFound.user}`, req.session)    
    
    
}