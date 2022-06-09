const number = require('@hapi/joi/lib/types/number');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ventaSchema = new Schema({
    user: {type: String, required: true},
    productos: [{
        id: {type: String, required: true},
        codigo: {type: Number, required: true},
        nombre: {type: String, required: true},
        precio: {type: Number, required: true},
        cantidad: {type: Number, required: true},
    }],
    total: {type: Number, default: 0},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Venta', ventaSchema)
