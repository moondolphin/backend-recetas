const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar email
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({ msg: 'Usuario o  Password son incorrectos' });
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({ msg: 'Usuario o Password son incorrectos' });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        // Respuesta para Postman
        res.json({
            email: usuario.email,
            localId: usuario.id,
            idToken: token,
            expiresIn: "14400" 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

const signup = async(req, res = response) => {
    
    const { email, password } = req.body;

    try {
        // Verificar si existe
        const existeEmail = await Usuario.findOne({ email });
        if ( existeEmail ) {
            return res.status(400).json({ msg: 'El correo ya existe' });
        }

        const usuario = new Usuario({ email, password });

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            email: usuario.email,
            localId: usuario.id,
            idToken: token,
            expiresIn: "3600"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al registrar' });
    }
}

module.exports = {
    login,
    signup
}