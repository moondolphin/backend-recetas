const { Router } = require('express');
const { login, signup } = require('../controllers/auth');

const router = Router();

// Ruta para Registrarse (SignUp)
router.post('/signup', signup );

// Ruta para Iniciar Sesión (Login)
router.post('/login', login );

module.exports = router;