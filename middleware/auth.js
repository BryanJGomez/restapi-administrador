const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{

    //autorizacion por el header
    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    //obtener el token y verificarlo
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, 'bryangomez');
    } catch (error) {
        error.statusCode = 500;
        throw error
    }
    //si el token es valido pero si hay algun error
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 500;
        throw error;
    }
    next();

}