const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            maxLength: 30
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        ingredients: [
            {
                name: {
                    type: String,
                    required: true,
                    maxLength: 15
                },
                metric: {
                    type: String,
                    required: true
                }
            }
        ],
        portions: {
            type: String,
            required: true
        },
        category: {
            type: String
        },
        image: {
            type: String
        },
        instructions: {
            type: String,
            required: true,
            maxLength: 200
        },
        comments: [
            {
                userId: {
                    type: mongoose.Types.ObjectId,
                    required: true,
                    ref: 'User'
                },
                text: {
                    type: String,
                    minlength: 1,
                    maxlength: 50
                }

            }
        ],
        likes: {
            type: Array
        }
    });

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;