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

const editRecipe = async(req, res = response ) => {
    const { id } = req.params;
    let { name, description, ingredients, imagePath } = req.body;

    const receta = await Receta.findByIdAndUpdate( id, { name, description, ingredients, imagePath }, { new: true } );

    res.status(200).json({msg: "update recipe ok" });

}


const deleteRecipe = async(req, res = response ) => {
    const { id } = req.params;


    const receta = await Receta.findByIdAndDelete( id );


    res.status(200).json({msg: "delete recipe ok" });


}


module.exports = {
    getRecipes,
    addRecipe,
    editRecipe,
    deleteRecipe
}