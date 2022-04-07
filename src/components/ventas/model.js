const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ventaSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productos: [
        { 
            codigo: {
                type: Number
            },
            nombre: {
                type: String
            },
            precio: {
                type: Number
            },
            cantidad: {
                type: Number
            },
            date: Date
        }
    ]
});

module.exports = mongoose.model('Venta', ventaSchema)
