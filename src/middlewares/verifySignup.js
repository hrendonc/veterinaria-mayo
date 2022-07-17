const ROLES = ["admin", "user"]
const User = require('../components/user/model')

exports.checkRolesExisted = (req, res, next)=>{
    if(req.body.roles){
        for(let i=0; i<req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({message: `Role does not exist`})
            }
        }
    }
    next()
}

exports.checkDuplicateUserOrMail = async (req, res, next)=>{
    if(!req.body.user || !req.body.pass || !req.body.email) return res.status(400).json({message: 'No se están recibiendo los datos requeridos!'})

    const user = await User.findOne({user: req.body.user})
    if(user) return res.status(400).json({message: 'User or mail exist!'})

    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(200).json({message: 'User or mail exist!'})

    next()
}