const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const TokenSchema = new Schema({
    token: {type: String}
})


const model = Mongoose.model('Token', TokenSchema)
module.exports = model