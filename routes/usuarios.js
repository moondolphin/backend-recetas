const { Router } = require('express');
const { usuariosGet, usuariosPost } = require('../controllers/usuarios');

const router = Router();
//probar coneccion a la ruta usuarios
router.get('/', usuariosGet );
router.post('/', usuariosPost );

module.exports = router;