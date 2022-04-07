const mongoose = require('mongoose')
const Schema = mongoose.Schema

const myShema = new Schema ({
    nombre : {
        type: String
    },
    precio: {
        type: Number
    },
    costo: {
        type: Number
    },
    stock: {
        type: Number
    },
    codigo: {
        type: Number
    }
})

const model = mongoose.model('Producto', myShema)
module.exports = model 