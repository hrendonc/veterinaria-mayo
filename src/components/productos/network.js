const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()
const {verifyToken, isAdmin} = require('../../middlewares/authJwt')
const {checkDuplicateProductOrCode} = require('../../middlewares/verifyProducts')

router.post('/', verifyToken, isAdmin, checkDuplicateProductOrCode, async (req, res)=>{    
    /*try{
        const ok = await controller.addProducto(req.body)

        if(ok){
            fullProducto => {response.success(req, res, 200, fullProducto)}            
            res.redirect('/addproducto')
        }
    }
    catch (e){
        response.error(req, res, 400, 'Error interno', e)
    }*/
    const {codigo, nombre, precio, costo, stock} = req.body
    if(!codigo || !nombre || !precio || !costo || !stock ) return res.status(400).json({Message: 'Faltaron datos requeridos'})
    
    controller.addProducto(req.body)
    .then((fullProducto)=>{response.success(req, res, 200, fullProducto)})
    .catch(e=>response.error(req, res, 400, 'Error interno', e))
})

router.get('/', verifyToken, (req, res)=>{
    controller.getProductos()
    .then((data)=>{
        response.success(req, res, 200, data)
    })
    .catch(e=>{
        response.error(req, res, 400, 'Error interno', e)
    })
})

router.patch('/:idproduct', verifyToken, isAdmin, async (req, res)=>{
    try{
        const ok = await controller.updateProducto(req.params, req.body)

        if(ok){
            response.success(req, res, 200, ok)
            //res.redirect('/addproducto')
        }
        if(!ok){
            response.error(req, res, 400, 'Datos incorrectos', 'No se encontro el ID')
        }
    }
    catch (e){
        response.error(req, res, 400, 'Error interno', e)
    }
    
})

router.delete('/:idproduct', verifyToken, isAdmin, (req, res)=>{
    controller.deleteProduct(req.params.idproduct)
    .then(() => {response.success(req, res, 200, `El producto con id: ${req.params.idproduct}, se eliminó con éxito!`)})
    .catch(e => {response.error(req, res, 500, 'Error interno', e)})
})

module.exports = router