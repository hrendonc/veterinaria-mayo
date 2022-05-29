const number = require('@hapi/joi/lib/types/number');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ventaSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    productos: [{
        id: {type: String, required: true},
        codigo: {type: Number, required: true},
        nombre: {type: String},
        precio: {type: Number},
        cantidad: {type: Number},
    }],
    total: {type: Number, default: 0},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Venta', ventaSchema)
