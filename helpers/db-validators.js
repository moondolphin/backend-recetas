const Usuario = require('../models/usuario');

const emailExiste = async( email = '' ) => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email });
    if ( existeEmail ) {
        throw new Error(`The email ${ email } is already registered`);
    }
}

const existeUsuarioPorId = async( id ) => {
    // Verificar si el ID existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    emailExiste,
    existeUsuarioPorId
}