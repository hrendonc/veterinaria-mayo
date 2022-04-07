const Model = require('./model')

function addProducto(producto){
    const myProduct = new Model(producto)
    return myProduct.save()
}

async function getVenta(){
    const ventas = await Model.find()
    return ventas
}

module.exports = {
    add: addProducto,
    list: getVenta
}