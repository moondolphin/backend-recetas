const { Router } = require('express');
const { check } = require('express-validator');
const { login, signup } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste } = require('../helpers/db-validators');

const router = Router();


router.post('/signup', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('email').custom( emailExiste ), 
    check('password', 'La contraseña debe tener más de 6 letras').isLength({ min: 6 }),
    validarCampos
], signup );

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'INVALID_PASSWORD').isLength({ min: 6 }),
    validarCampos
],login );

module.exports = router;