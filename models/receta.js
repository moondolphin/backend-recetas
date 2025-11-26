const { Schema, model } = require('mongoose');

const RecetaSchema = Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    ingredients: [
        {
            amount: { type: String, required: true },
            name: { type: String, required: true }

        }
    ],

    imagePath: {
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true
    }
});

module.exports = model('Receta', RecetaSchema);