const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async(req, res, next)=>{
    try {
        const pedidos = new Pedidos(req.body);
        await pedidos.save();
        res.json({mensaje: 'Se agrego un nuevo pedido'})
    } catch (error) {
        console.log(error);
        return next();
    }
}

//muestra todo los pedidos
exports.mostrarPedidos = async (req, res, next)=>{
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Producto'
        })
        res.json(pedidos);
    } catch (error) {
        console.log(error);
         next();
    }
}

//mostrar un pedido por su ID
exports.mostrarPedido = async(req, res, next)=>{
    const pedidos = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Producto'
    })
    if(pedidos){
        res.json(pedidos);
    }else{
        res.json({mensaje: 'Ese pedido no existe'});
        return next();
    }
}

//actualizacion de pedidos
exports.actualizarPedido = async(req, res, next)=>{
    try{
        const pedidos = await Pedidos.findByIdAndUpdate({_id: req.params.idPedido}, req.body,{
            new: true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Producto'
        });
        res.json(pedidos);
    }catch(error){
        console.log(error);
        return next()
    }
}

exports.eliminarPedido = async(req, res, next)=>{
    try {
        await Pedidos.findByIdAndDelete({_id: req.params.idPedido});
        res.json({mensaje: "El pedido se ha elimiado"});
    } catch (error) {
        console.log(error);
        return next();
    }
}
