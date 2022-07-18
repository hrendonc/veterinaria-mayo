const store = require('./store')
const User = require('./model')
const response = require('../../network/response')

exports.addUser = (data)=>{
    return new Promise((resolve, reject)=>{
        if(!data.user && !data.pass){
            reject('[messageController] - No se recibió usuario o password')
            return false
        }else{
            const fullData = {
                user: data.user,
                pass: data.pass,
                email: data.email,
                date: new Date()
            }

            addData = store.add(fullData)
            resolve(addData)
        }
    })
}

exports.getUsers = ()=>{
    return new Promise((resolve, reject)=>{
        resolve(store.list())
    })
}

exports.updateUserById = async (req, res)=>{
    if(Object.entries(req.body).length === 0)
    return res.status(400).json({message: 'No se recibieron datos para modificar'})
    
    const user = await User.findOne({user: req.body.user})
    if(user) return res.status(400).json({message: 'User exist!'})

    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).json({message: 'Mail exist!'})

    try {
        const updated = await User.findByIdAndUpdate(req.params.idUser, req.body, {new: true})
        response.success(req, res, 200, 'Actualizado Correctamente', updated) 
    } catch (error) {
        response.error(req, res, 400, 'Algo salio mal al intentar actualizar, intentelo de nuevo', error)
    }
}

exports.deleteUser = async (req, res)=>{
    try {
        const delUser = await User.findByIdAndDelete(req.params.idUser)
        response.success(req, res, 200, `El usuario ${delUser.user} ha sido eliminado`)
    } catch (error) {
        response.error(req, res, 400, 'Error al eliminar el usuario, intentelo de nuevo', error)
    }    
}