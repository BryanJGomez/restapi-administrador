const Usuario = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuarios = async(req, res)=>{
    //ller los datos  del usuario y colocarlos en Usuario
     const usuario = new Usuario(req.body);
     usuario.password = await bcrypt.hash(req.body.password,12);
     try {
         await usuario.save();
         res.json({mensaje:'Usuario creado correctamente'});
     } catch (error) {
         console.log(error);
         res.json({mensaje: 'Hubo un error'});
     }
}

exports.autenticarUsuario = async(req, res, next)=>{

    //buscamos el usuario
    const {email, password} = req.body
    const usuario = await Usuario.findOne({email});

    if(!usuario){
        //si el usuario no existe
        await res.status(401).json({mensaje:'este usuario no existe'});
        next();
    }else{ 
        //el usuario existe, verificar si el password es correcto o no
        if(!bcrypt.compareSync(password, usuario.password)){
                //si el passwword es incorrecto
                await res.status(401).json({mensaje: 'Password incorrecto'});
                next();
        }else{
            //el password correcto enviamos el token
            const token = jwt.sign({
                email : usuario.email,
                nombre : usuario.nombre,
                password : usuario.password,
                id : usuario._id
            }, 
            'bryangomez',
            {
                expiresIn: '5h'
            }
            );

            //retomamos el token
            res.json({token});
        }

    }

}