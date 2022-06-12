const Model = require('./model')

async function addUser(data){
    newUser = new Model(data)
    
    const existe = await newUser.usernameExist(data.user)

    if (existe) {
        return false
    }else{
        await newUser.save()
    }
    
}

async function getUsers(){
    const users = await Model.find()
    return users
}

module.exports = {
    add: addUser,
    list: getUsers,
}