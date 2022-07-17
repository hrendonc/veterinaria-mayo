const  {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    user: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
    roles: [{ref: 'Role', type: Schema.Types.ObjectId}],
    date: Date, 
    versionKey: false
})

UserSchema.statics.encryptPass = async (pass)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(pass, salt)
}

UserSchema.statics.comparePass = async (pass, receivedPass)=>{
    return await bcrypt.compare(pass, receivedPass)
}

module.exports = model('User', UserSchema)