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
    const emailUsuario = req.usuario.email;
    const receta = new Receta({
        name,
        description,
        imagePath,
        ingredients,
        userEmail: emailUsuario
    });

    await receta.save();

    res.json({
        msg: "Store recipe ok"
    });
}

const editRecipe = async(req, res = response ) => {
    const { id } = req.params;
    const { name, description, ingredients, imagePath } = req.body;

    const receta = await Receta.findByIdAndUpdate( id, { name, description, ingredients, imagePath }, { new: true } );
    const mensj = receta.name + " actualizada correctamente";
    res.status(200).json({mensj });

}


const deleteRecipe = async(req, res = response ) => {
    const { id } = req.params;
    const receta = await Receta.findByIdAndDelete( id );
    const mensj = receta.name + " eliminada correctamente";
    res.status(200).json({mensj });
}


module.exports = {
    getRecipes,
    addRecipe,
    editRecipe,
    deleteRecipe
}