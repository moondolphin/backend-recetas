const { response } = require('express');
const Receta = require('../models/receta');

// GET: Obtener recetas (/api/recipes/get)
const getRecipes = async(req, res = response) => {
    
    const emailUsuario = req.usuario.email;
    const recetas = await Receta.find({ userEmail: emailUsuario });

    res.json(recetas);
}

// POST: Agregar receta (/api/recipes/add)
const addRecipe = async(req, res = response) => {
    
    const { name, description, imagePath, ingredients } = req.body;
    
    const receta = new Receta({
        name,
        description,
        imagePath,
        ingredients,
        userEmail: req.usuario.email 
    });

    await receta.save();

    res.json({
        msg: "Store recipe ok"
    });
}


module.exports = {
    getRecipes,
    addRecipe
}