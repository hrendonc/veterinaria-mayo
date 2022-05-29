const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.post('/', async (req, res)=>{    
    try{
        const ok = await controller.addProducto(req.body)

        if(ok){
            fullProducto=>{response.success(req, res, 200, fullProducto)}
            res.redirect('/addproducto')
        }
    }
    catch (e){
        response.error(req, res, 400, 'Error interno', e)
    }

    // controller.addProducto(req.body)
    // .then((fullProducto)=>{response.success(req, res, 200, fullProducto)})
    // .catch(e=>response.error(req, res, 400, 'Error interno', e))
})

router.get('/', (req, res)=>{
    controller.getProducto()
    .then((data)=>{
        response.success(req, res, 200, data)
    })
    .catch(e=>{
        response.error(req, res, 400, 'Error interno', e)
    })
})

router.patch('/:idproduct', async (req, res, next)=>{

    const {idproduct} = req.params
    const {codigo, nombre, precio, costo, stock, descripcion} = req.body

    if(!idproduct){
        response.error(req, res, 400, 'No se recibió el ID del producto')
        return false
    } 
    if(!codigo && !nombre && !precio && !costo && !stock && !descripcion){
        response.error(req, res, 400, 'No se recibió la información para actualizar')
        return false
    } 

    try{
        console.log('Network--- ', req.params)
        const ok = await controller.updateProduct(req.params, req.body)

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

router.delete('/:idproduct', (req, res, next)=>{
    
})

module.exports = router