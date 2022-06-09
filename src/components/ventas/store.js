const Venta = require('./model')
const Producto = require('../productos/model')

async function addVenta(req){
    let ticket = req.body    
    let total = 0
    
    for(x in ticket.productos){
        total += ticket.productos[x].precio * ticket.productos[x].cantidad
    }

    ticket.total = total

    const newVenta = new Venta(ticket)

    restarProducto()
    
    return newVenta.save()

    // Restar una venta del Stock
    async function restarProducto(){

        for (x in req.body.productos) {
            const myCodigo = req.body.productos[x].codigo
            const myCantidad = req.body.productos[x].cantidad

            const producto = await Producto.find({ codigo: myCodigo })
            const newStock = producto[0].stock - myCantidad

            await Producto.updateOne(
                { codigo: myCodigo },
                {
                    $set: { stock: newStock }
                }
            )            
        }        
    }
}

async function getVenta(){
    const ventas = await Venta.find()
    return ventas
}

module.exports = {
    add: addVenta,
    list: getVenta,
}