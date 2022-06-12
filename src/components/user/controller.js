const store = require('./store')

addUser = (data)=>{
    return new Promise((resolve, reject)=>{
        if(!data){
            console.error('[messageController] - No se recibió usuario o password')
            reject('Datos incorrectos')
            return false
        }

        if(data.user && data.pass){
            const fullUser = {
                user: data.user,
                pass: data.pass,
                email: data.email,
                date: new Date()
            }

            store.add(fullUser)
            resolve(fullUser)
        }else{
            reject('Ya existe usuario')
            return false
        }
        
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