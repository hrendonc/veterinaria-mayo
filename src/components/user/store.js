const Model = require('./model')

function addUser(user){
    newUser = new Model(user)
    newUser.save()
}

async function getUsers(){
    const users = await Model.find()
    return users
}

module.exports = {
    add: addUser,
    list: getUsers,
}