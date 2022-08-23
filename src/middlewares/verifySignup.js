const ROLES = ["admin", "user"]
const User = require('../components/user/model')
const response = require('../network/response')

exports.checkRolesExisted = (req, res, next)=>{
    if(req.body.roles){
        for(let i=0; i<req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return response.error(req, res, 400, `El rol introdicido no existe.`)
            }
        }
    }
    next()
}

exports.checkDuplicateUserOrMail = async (req, res, next)=>{
    if(!req.body.user || !req.body.pass || !req.body.email)
    return response.error(req, res, 400, 'No se están recibiendo los datos requeridos.')

    const user = await User.findOne({user: req.body.user})
    if(user) return response.error(req, res, 400, `El usuario ${req.body.user} ya está en uso.`)

    const email = await User.findOne({email: req.body.email})
    if(email) return response.error(req, res, 400, `El Email ${req.body.email} ya está en uso.`)

    next()
}