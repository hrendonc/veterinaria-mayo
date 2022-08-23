const Product = require('../components/productos/model')
const response = require('../network/response')

exports.checkDuplicateProductOrCode = async (req, res, next)=>{
    const productFound = await Product.findOne({nombre: req.body.nombre})
    if(productFound) return response.error(req, res, 400, `El producto ${req.body.nombre} ya existe.`)

    const codigoFound = await Product.findOne({codigo: req.body.codigo})
    if(codigoFound) return response.error(req, res, 400, `El codigo ${req.body.codigo} ya existe.`)

    next()
}