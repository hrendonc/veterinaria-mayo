const User = require('../user/model')
const jwt = require('jsonwebtoken')
const Role = require('./role')
require('dotenv').config()

exports.signUp = async (req, res)=>{
    const {user, pass, email, roles} = req.body

    try {
        const newUser = new User({
            user,
            pass: await User.encryptPass(pass),
            email
        })

        if(roles){
            const foundRoles = await Role.find({name: {$in: roles}})
            newUser.roles = foundRoles.map(role => role._id)
        }else{
            const role = await Role.findOne({name: 'user'})
            newUser.roles = [role._id]
        }
    
        const savedUser = await newUser.save()
        const token = jwt.sign({id: savedUser._id}, process.env.SECRET, {expiresIn: '1d'})
    
        console.log(savedUser)
        res.status(200).json(token)

    } catch (error) {
        console.log(error)
    }
    
}

exports.signIn = async (req, res)=>{
    const userFound = await User.findOne({email: req.body.email}).populate('roles')
    
    if(!userFound) return res.status(400).json({message: 'User not found'})

    const matchPass = await User.comparePass(req.body.pass, userFound.pass)

    if(!matchPass) return res.status(400).json({token: null, message: 'Invalid password'})

    const token = jwt.sign({id: userFound._id}, process.env.SECRET, {expiresIn: '1d'})

    console.log(userFound)
    res.json({token})
}