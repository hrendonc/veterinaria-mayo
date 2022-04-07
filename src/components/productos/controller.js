const store = require('./store')

function addProducto(data){
    console.log('Controller] - ',data)
    if(!data){
        console.error('[Controller] - No se recibió un algún dato')
        return new Promise.reject('Faltó algún dato')
    }

    const fullProducto = data

    return store.add(fullProducto)
}

function getProducto(){
    return new Promise((resolve, reject)=>{
        resolve(store.list())
    })
}


module.exports = {
    addProducto,
    getProducto
}