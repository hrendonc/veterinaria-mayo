const db = require('mongoose')

db.Promise = global.Promise

async function connect(){
    const uri = 'mongodb://localhost:27017/vetmayo'
    await db.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Conectado a Mongo DB'))
    .catch(e=>console.log('[Error de conexión] - ', e))
}

module.exports = connect