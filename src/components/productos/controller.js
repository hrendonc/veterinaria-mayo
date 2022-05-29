const store = require('./store')

function addProducto(data){
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

function updateProduct(id, data){
    console.log('Controller--- ', id)
    return new Promise(async (resolve, reject)=>{
        if(!id || !data){
            return reject('Datos Invalidos')
        }
        const result = await store.update(id, data)
        resolve(result)
    })
}


module.exports = {
    addProducto,
    getProducto,
    updateProduct
}