const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');


const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, __dirname+'../../uploads');
        },
        filename:(req, file, cb)=>{
            const extension = file.mimetype.split('/')[1];
            cb(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(new Error('formato no valido'))
        }
    }
}

//pasar la configuracion y el campo
const uploads = multer(configuracionMulter).single('imagen');

//subir un archivo
exports.subirArchivo = async(req, res, next)=>{
    uploads(req, res, function(error){
        if(error){
            res.json({mensaje: error})
        }
        return next();  
    });
}


//agregar un nuevo producto ala db
exports.nuevoProducto = async(req, res, next)=>{
    const producto =  Productos(req.body);

    try {
        //si hay un archio talves suben un prodcto pero no una imagen
        if(req.file.filename){
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({mensaje: 'Se agrego un nuevo producto'});
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.mostrarProductos = async(req, res, next)=>{
    try {
        //obtener todo los productos
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        return next();
    }
}

//mostrar un producto por su id
exports.mostrarProducto = async(req, res, next)=>{
    const producto = await Productos.findById(req.params.idProducto);

    //si el prodcuto existe lo mostramos en formato json
    if(producto){
        res.json(producto);
    }else{
        //si el producto no existe mandamos un mensaje
        res.json({mensaje: 'Este prodcto no existe'});
        return next();
    }
}

exports.actualizarProducto = async(req, res, next)=>{
    try {

        //actualizar la imagen
        let productoAnterior = await Productos.findById(req.params.idProducto);

        //construimos un nuevo producto
        let nuevoProducto = req.body;

        //verificamos si existe una imagen
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }else{
            nuevoProducto.imagen = productoAnterior.imagen;
        }


        let producto = await Productos.findByIdAndUpdate({
            _id: req.params.idProducto},
            nuevoProducto,{
                new: true
            });
        res.json(producto);
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.eliminarProducto = async(req, res, next)=>{
    try {
        await Productos.findByIdAndDelete({_id: req.params.idProducto});
        res.json({mensaje: 'El producto se elimino'});
    } catch (error) {
        console.log(error);
        return next();
    }
}

exports.buscarProductos = async(req, res, next)=>{
    try {
        //obtener query
        const {query} = req.params
        const producto = await Productos.find({nombre: new RegExp(query, 'i')});
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}