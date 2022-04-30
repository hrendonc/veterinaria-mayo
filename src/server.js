const express = require('express')
const router = require('./network/routes')
const db = require('./db')

// Conexión a la DB
db()

const app = express()

// Obtener información del cliente (Body/Query)
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Rutas
router(app)

// Servir Archivos Estaticos
app.use('/', express.static(__dirname + '/public'))
app.use('/addproducto', express.static(__dirname + '/public/addProducto.html'))
app.use('/adduser', express.static(__dirname + '/public/callCrud/addUser.html'))

// Ejecutar Servidor
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`)
})
