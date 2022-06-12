const Model = require('./model')

async function addUser(data){   
        newUser = new Model(data)
        const existe = await newUser.usernameExist(data.user)

    return new Promise((resolve, reject)=>{

        if (existe) {
            reject('[Store] - El usuario ya existe!')
            return false
        }else{
            const addMyUser = newUser.save()
            resolve(addMyUser)
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