const store = require('./store')

exports.addUser = (data)=>{
    return new Promise((resolve, reject)=>{
        if(!data.user && !data.pass){
            reject('[messageController] - No se recibió usuario o password')
            return false
        }else{
            const fullData = {
                user: data.user,
                pass: data.pass,
                email: data.email,
                date: new Date()
            }

            addData = store.add(fullData)
            resolve(addData)
        }
    })
}

exports.getUsers = ()=>{
    return new Promise((resolve, reject)=>{
        resolve(store.list())
    })
}