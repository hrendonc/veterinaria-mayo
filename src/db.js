const db = require('mongoose')
require('dotenv').config()

db.Promise = global.Promise

async function connect(){
    const uri = `mongodb+srv://vetmayo:${process.env.PASSWORD}@cluster0.78sjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    await db.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Conectado a Mongo DB'))
    .catch(e=>console.log('[Error de conexión DB] - ', e))
}

module.exports = connect