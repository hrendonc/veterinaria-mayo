const express = require('express')
const router = require('./network/routes')
const db = require('./db')
var cors = require('cors')
const {createRoles} = require('./libs/initialSetup')

const path = require('path')
const session = require('express-session')

// Conexión a la DB
db()

const app = express()
createRoles()

app.use(cors())

// Establecer el motor de vistas
const ejs = require('ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Servir Archivos Estaticos
app.use(express.static(path.join(__dirname, 'views')))

// Obtener información del cliente (Body/Query)
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false
}))

// Rutas
router(app)

// Ejecutar Servidor
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`)
})
