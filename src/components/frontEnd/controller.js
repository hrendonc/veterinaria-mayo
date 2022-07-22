
exports.login = (req, res)=>{
    res.render('index.ejs')
}

exports.settings = (req, res)=>{
    let user = req.session
    res.render('layout', {user})
}

exports.carrito = (req, res)=>{
    let user = req.session
    res.render('carrito', {user})
}