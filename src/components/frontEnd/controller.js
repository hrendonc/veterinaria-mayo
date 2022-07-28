
exports.login = (req, res)=>{
    res.render('login', {body:''})
}

exports.settings = (req, res)=>{
    let user = req.session
    res.render('dashboard', {user})
}

exports.carrito = (req, res)=>{
    let user = req.session
    console.log(user)
    res.render('carrito', {user})
}

exports.logout = (req, res)=>{
    req.session.destroy(function(err) {
        res.render('login')
      })
}