const Model = require('./model')

function addProducto(producto){
    const myProduct = new Model(producto)
    return myProduct.save()
}

async function getProductos(){
    const ventas = await Model.find()
    return ventas
}

async function updateProducto(id, data){
    try{
        const foundData = await Model.findOne({
            _id: id.idproduct
        })
    
        if(foundData){
            if(data.codigo) foundData.codigo = data.codigo
            if(data.nombre) foundData.nombre = data.nombre
            if(data.precio) foundData.precio = data.precio
            if(data.costo) foundData.costo = data.costo
            if(data.stock) foundData.stock = data.stock
            if(data.descripcion) foundData.descripcion = data.descripcion
            if(data.img) foundData.img = data.img

            const newData = await foundData.save()
            return newData
        }else{
            return false
        }
    }
    catch (e){
        console.log('[Update-Store] - ', e)
        return false
    }    
}

function deleteProduct(id){
    return Model.deleteOne({_id: id})
}

module.exports = {
    add: addProducto,
    list: getProductos,
    update: updateProducto,
    delete: deleteProduct
}