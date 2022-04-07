const store = require('./store')

addUser = (data)=>{
    console.log(data)
    return new Promise((resolve, reject)=>{
        if(!data){
            console.error('[messageController] - No se recibió usuario o password')
            reject('Datos incorrectos')
            return false
        }

        const fullUser = {
            user: data.user,
            pass: data.pass,
            email: data.email,
            date: new Date()
        }
        store.add(fullUser)
        console.log(fullUser)
        resolve(fullUser)
    })
}

function getUsers(){
    return new Promise((resolve, reject)=>{
        resolve(store.list())
    })
}

module.exports = {
    addUser,
    getUsers,
}