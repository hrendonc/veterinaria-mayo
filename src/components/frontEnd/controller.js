
exports.login = (req, res)=>{
    res.render('login', {body:''})
}

exports.logout = (req, res)=>{
    let user = req.session.user
    req.session.destroy(function(err) {
        res.render('login', {body: `Sesión de ${user} terminada.`})
      })
}

exports.carrito = (req, res)=>{
    let user = req.session
    res.render('carrito', {user})
}

exports.settings = (req, res)=>{
    let user = req.session
    res.render('dashboard', {user})
}

exports.productos = (req, res)=>{
    res.render('productos', {fullProducto:''})
}