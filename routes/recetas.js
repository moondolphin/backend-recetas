const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const { getRecipes, addRecipe, editRecipe, deleteRecipe } = require('../controllers/recetas');

const router = Router();


// GET (/api/recipes/get)
router.get('/get', [
    validarJWT
], getRecipes);

// POST (/api/recipes/add)
router.post('/add', [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('ingredients', 'Los ingredientes son obligatorios').isArray(),
    validarCampos
], addRecipe);



module.exports = router;