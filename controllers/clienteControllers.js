const Clientes = require('../models/Clientes');

//insertar los clientes en la db
exports.nuevoCliente = async (req, res, next)=>{
    
    const clientes = Clientes(req.body);

    try {
        //almacenar el registros
        await clientes.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'});
    } catch (error) {
        //si existe un error a la hora de guarda lo imprumos y damos next
        res.send(error);
        next();
    }
}

//mostrar los clientes 
exports.mostrarClientes = async(req, res, next)=>{
    
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

//mostrar clientes por su ID
exports.mostrarCliente = async (req, res, next) =>{
    const cliente = await Clientes.findById(req.params.idCliente);

    
    if(cliente){
        //si el cliente existe lo mostramos en pantalla
        res.json(cliente);
    }else{
        //si el cliente no existe le mostramos un mensaje 
        res.json({mensaje: 'Este cliente no existe'});
        return next();
    }
    
}

exports.actualizarCliente = async(req, res, next)=>{
    try {
        const cliente = await Clientes.findOneAndUpdate({
         _id: req.params.idCliente}, req.body,{
             new: true
         }
        );
        
        res.json(cliente);
    } catch (error) {
        res.send(error);
        return next();
    }
}

//eliminamos los clientes registrados
exports.eliminarCliente = async(req, res, next)=>{
    try {
         await Clientes.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'El Cliente ha sido eliminado exitosamente'});
    } catch (error) {
        console.log(error);
        return next();
    }

}