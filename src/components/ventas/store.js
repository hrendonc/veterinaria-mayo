const Venta = require('./model')
const User = require('../user/model')
const Producto = require('../productos/model')

async function addVenta(req){
    const { userId } = req.params
    const newVenta = new Venta(req.body)
    const user = await User.findById(userId)
    newVenta.user = user

    restarProducto()
    
    return newVenta.save()

    // Restar una venta del Stock
    async function restarProducto(){

        for (x in req.body.productos) {

            console.log(req.body.productos)
            const myCodigo = req.body.productos.codigo[x].codigo
            const myCantidad = req.body.productos.codigo[x].cantidad

            const producto = await Producto.find({ codigo: myCodigo })
            const newStock = producto[0].stock - myCantidad

            await Producto.updateOne(
                { codigo: req.body.productos[x].codigo },
                {
                    $set: { stock: newStock }
                }
            )            
        }        
    }
}

async function getVenta(){
    const ventas = await Model.find()
    return ventas
}

module.exports = {
    add: addVenta,
    list: getVenta,
}