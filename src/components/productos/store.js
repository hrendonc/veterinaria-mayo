const Model = require('./model')

function addProducto(producto){
    const myProduct = new Model(producto)
    return myProduct.save()
}

async function getVenta(){
    const ventas = await Model.find()
    return ventas
}

async function updateProducto(id, data){
    console.log('Store--- ', id.idproduct)

    try{
        const foundData = await await Model.findOne({
            _id: id.idproduct
        })
    
        if(foundData){
            if(data.codigo) foundData.codigo= data.codigo
            if(data.nombre) foundData.nombre = data.nombre
            if(data.precio) foundData.precio = data.precio
            if(data.costo) foundData.costo = data.costo
            if(data.stock) foundData.stock = data.stock
            if(data.descripcion) foundData.descripcion = data.descripcion

            const newData = await foundData.save()
            return newData
        }else{
            console.log('Algo salio mal')
            return false
        }
    }
    catch (e){
        console.log('error')
        return false
    }    
}

module.exports = {
    add: addProducto,
    list: getVenta,
    update: updateProducto
}