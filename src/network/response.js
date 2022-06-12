exports.success = (req, res, status, mensaje, data)=>{
    res.status(status).send({
        error: null,
        body: data,
        message: mensaje
    })
}

exports.error = (req, res, status, mensaje, detalles)=>{
    console.error('Error: ', detalles)
    res.status(status).send({
        error: mensaje,
        body: null
    })
}