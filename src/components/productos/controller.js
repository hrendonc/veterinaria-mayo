const store = require('./store')

function addProducto(data){
    if(!data){
        console.error('[Controller] - No se recibieron los datos esperados')
        return new Promise.reject('Faltó algún dato')
    }

    const fullProducto = data

    return store.add(fullProducto)
}

function getProductos(){
    return new Promise((resolve, reject)=>{
        resolve(store.list())
    })
}

function updateProducto(id, data){
    return new Promise(async (resolve, reject)=>{
        if(!id || !data){
            return reject('Datos Invalidos')
        }
        const result = await store.update(id, data)
        resolve(result)
    })
}

function deleteProduct(id){
    return new Promise((resolve, reject)=>{
        if(!id){
            return reject('In invalido!')
        }

        store.delete(id)
        .then(()=>{resolve()})
        .catch(e=>{reject(e)})
    })
}

module.exports = {
    addProducto,
    getProductos,
    updateProducto,
    deleteProduct
}