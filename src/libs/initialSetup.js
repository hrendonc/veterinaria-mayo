const Role = require('../components/auth/role')

exports.createRoles = async ()=>{
    try {
        const contador = await Role.estimatedDocumentCount()

        if(contador>0) return

        const values = await Promise.all([
            new Role({name: 'admin'}).save(),
            new Role({name: 'user'}).save()
        ])

    console.log(values) 

    } catch (error) {
        console.log(error)
    }    
}