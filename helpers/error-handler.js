function errorHandler(err, req, res, next) {
    
    if (err.name === 'UnauthorizedError') { //error de jwt
        return res.status(401).json({
            message: "The user is not authorized"
        });
    }

    if (err.name === 'ValidationError') {   //error de validacion
        return res.status(401).json({
            message: err
        });
    }

    return res.status(500).json(err);   //otros errores
}

module.exports = errorHandler;