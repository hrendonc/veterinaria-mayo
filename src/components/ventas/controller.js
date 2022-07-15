const store = require('./store')

function addVenta(req){

    if (!req.body) {
        console.error('[messageController] - No se recibieron datos')
        return new Promise.reject('No se recibieron datos')
    }

    return store.add(req)
}

function getVenta(){
    return new Promise((resolve, reject)=>{
        resolve(store.list())
    })
}

module.exports = {
    addVenta,
    getVenta
}