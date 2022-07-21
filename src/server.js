const express = require('express')
const router = require('./network/routes')
const db = require('./db')
var cors = require('cors')
const {createRoles} = require('./libs/initialSetup')

const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

// Conexión a la DB
db()

const app = express()
createRoles()

app.use(cors())

// set the view engine to ejs
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'ejs');

// MIDDLEWARES
// Obtener información del cliente (Body/Query)
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false
}))

app.use(flash())

// Rutas
router(app)

// Servir Archivos Estaticos
app.get('/', function(req, res) {
    res.render('index');
});

/*
app.post('/register', (req, res)=>{
    req.session.user = req.body
    req.flash('user', req.body)
    res.redirect('/profile')
})

app.get('/profile', (req, res)=>{
    const user = req.flash('user')[0]
    res.render('profile', {user})
})
*/

app.get('/carrito', (req, res)=>{
    const user = req.flash('user')[0]
    console.log(user)
    res.render('carrito', {user})
})

// Servir Archivos Estaticos
//app.use('/', express.static(__dirname + '/public'))
//app.use('/addproducto', express.static(__dirname + '/public/addProducto.html'))
//app.use('/adduser', express.static(__dirname + '/public/addUser.html'))

// Ejecutar Servidor
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`)
})
