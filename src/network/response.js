exports.success = (req, res, status, message, data)=>{
    res.status(status).send({
        error: null,
        message,
        body: data
    })
}

exports.error = (req, res, status, mensaje, detalles)=>{
    console.error('Response Error: ', detalles)
    res.status(status).send({
        error: mensaje,
        body: null
    })
}