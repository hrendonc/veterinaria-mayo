const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env
const Token = require('./modelToken')
const response = require('../../network/response')

const UserSchema = new Schema({
    user: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    date: Date
})

UserSchema.pre('save', function(next){
    if(this.isModified('pass') || this.isNew){
        const document = this
        bcrypt.hash(document.pass, 10, (error, hash)=>{
            if (error) {
                next(error)
            }else{
                document.pass = hash
                next()
            }
        })
    }else{
        next()
    }
})

UserSchema.methods.usernameExist = async function(user){
    try {
        let result = await Mongoose.model('User').find({user: user})
        return result.length > 0
    } catch (error) {
       return false 
    }
    
}

UserSchema.methods.isCorrectPass = async function(pass, hash){
    try {
       const same = await bcrypt.compare(pass, hash)
        return same 
    } catch (error) {
        return false
    }
    
}

UserSchema.methods.createAccessToken = function() {
    const {id, user} = this
    const  accessToken = jwt.sign(
        {user: {id, user}},
        ACCESS_TOKEN_SECRET,
        {expiresIn: '1m'}
    )
    return accessToken
}

UserSchema.methods.createRefreshToken = async function() {
    const {id, user} = this
    const  refreshToken = jwt.sign(
        {user: {id, user}},
        REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    )
    try {
        await new Token({token: refreshToken}).save()
        return refreshToken
    } catch (error) {
        response.error(req, res, 400, 'Error al crear Refresh Token', error)
    }
}

const model = Mongoose.model('User', UserSchema)
module.exports = model