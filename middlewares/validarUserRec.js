const Receta = require('../models/receta');

const validarUserRec = async (req, res, next) => {
    try {
        const recetaId = req.params.id;
        const receta = await Receta.findById(recetaId);
        const usuarioEmail = req.usuario.email;
        if (!receta) {
            return res.status(404).json({ msg: 'Receta no encontrada' });
        }
        
        console.log('Email del usuario autenticado:', usuarioEmail);
        console.log('Email de la receta:', receta.userEmail);

        // Verifica que el email del usuario autenticado coincida con el de la receta
        if (receta.userEmail !== usuarioEmail) {
            return res.status(403).json({ msg: 'No tienes permisos para modificar esta receta' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ msg: 'Error de servidor' });
    }
};


module.exports = {
    validarUserRec
}