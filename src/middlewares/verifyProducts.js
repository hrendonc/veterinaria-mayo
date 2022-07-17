const Product = require('../components/productos/model')

exports.checkDuplicateProductOrCode = async (req, res, next)=>{
    const productFound = await Product.findOne({nombre: req.body.nombre})
    if(productFound) return res.status(400).json({message: 'El producto ya existe!'})

    const codigoFound = await Product.findOne({codigo: req.body.codigo})
    if(codigoFound) return res.status(200).json({message: 'El codigo ya existe!'})

    next()
}