const  {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
//const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env
//const Token = require('./modelToken')
//const response = require('../../network/response')

const UserSchema = new Schema({
    user: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    date: Date, 
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }],
    versionKey: false
})

UserSchema.statics.encryptPass = async (pass)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(pass, salt)
}

UserSchema.statics.comparePass = async (pass, receivedPass)=>{
    return await bcrypt.compare(pass, receivedPass)
}

UserSchema.methods.usernameExist = async function(user){
    try {
        let result = await Mongoose.model('User').find({user: user})
        return result.length > 0
    } catch (error) {
       return false 
    }
}

module.exports = model('User', UserSchema)