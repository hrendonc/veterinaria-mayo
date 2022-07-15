const Model = require('./model')

const Role = require('../auth/role')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function addUser(data){   
        newUser = new Model(data)
        const existe = await newUser.usernameExist(data.user)

        if(data.roles){
            const foundRoles = await Role.find({name: {$in: data.roles}})
            newUser.roles = foundRoles.map(role => role._id)
        }else{
            const role = await Role.findOne({name: 'user'})
            newUser.roles = [role._id]
        }

        newUser.pass = await Model.encryptPass(newUser.pass)

    return new Promise((resolve, reject)=>{

        if (existe) {
            reject('[Store] - El usuario ya existe!')
            return false
        }else{
            const addMyUser = newUser.save()
            const token = jwt.sign({id: addMyUser._id}, process.env.SECRET, {expiresIn: '1d'})
            //resolve(addMyUser)
            resolve(token)
        }
    })
}

async function getUsers(){
    const users = await Model.find()
    return users
}

module.exports = {
    add: addUser,
    list: getUsers,
}