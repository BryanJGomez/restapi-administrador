const express = require('express');
const router = express.Router();
const clienteControllers = require('../controllers/clienteControllers');
const productoControllers = require('../controllers/productoControllers');
const pedidosControllers = require('../controllers/pedidosControllers');
const usuariosControllers = require('../controllers/usuariosControllers');
//middleware para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function(){

    //agrega nuevo cliente via POST
    router.post('/clientes',
        auth,
        clienteControllers.nuevoCliente
    );

    router.get('/clientes',
        auth,
        clienteControllers.mostrarClientes
    );

    //mostrar un cliente en especifico
    router.get('/clientes/:idCliente',
        auth,
        clienteControllers.mostrarCliente
    );

    //actualizamos un cliente por id
    router.put('/clientes/:idCliente',
        auth,
        clienteControllers.actualizarCliente
    );

    //eliminamos un registros por su id
    router.delete('/clientes/:idCliente',
        auth, 
        clienteControllers.eliminarCliente
    );

    /* productos*/

    //ruta para agregar prodcutos
    router.post('/productos',
        auth,
        productoControllers.subirArchivo,
        productoControllers.nuevoProducto
    );

    //muestra todo los productos 
    router.get('/productos', 
        auth, 
        productoControllers.mostrarProductos
    );

    //mostrar un solo productos en especifico por su ID
    router.get('/productos/:idProducto',
        auth, 
        productoControllers.mostrarProductos
    );

    //actualizar prodcutos
    router.put('/productos/:idProducto', 
        auth,
        productoControllers.subirArchivo,
        productoControllers.actualizarProducto
    );

    //eliminamos los productos
    router.delete('/productos/:idProducto',
        auth,
        productoControllers.eliminarProducto
    );

    //busqueda de producto
    router.post('/productos/busquedad/:query', 
        auth,
        productoControllers.buscarProductos
    );


    //***PEDIDOS */
    //agrega un nuevo pedido
    router.post('/pedidos/nuevo/:idUsusario',
        auth,
        pedidosControllers.nuevoPedido
    );

    //mostrar  todo los pedidos
    router.get('/pedidos',
        auth,
        pedidosControllers.mostrarPedidos
    );

    //mostrar un pedido por su ID
    router.get('/pedidos/:idPedido',
        auth,
        pedidosControllers.mostrarPedido
    );

    //actualizar los pedidos
    router.put('/pedidos/:idPedido', 
        auth, 
        pedidosControllers.actualizarPedido
    );

    //eliminar un pedido
    router.delete('/pedidos/:idPedido',
        auth,
        pedidosControllers.eliminarPedido 
    );

    /** creacion de usuarios */
    router.post('/crear-cuenta', usuariosControllers.registrarUsuarios);

    router.post('/iniciar-sesion', usuariosControllers.autenticarUsuario);



    return router;
}