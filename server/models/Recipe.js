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
            //required: true
        },
        ingredients: [
            {
                name: {
                    type: String,
                    //required: true,
                    maxLength: 15
                },
                metric: {
                    type: String,
                    //required: true
                }
            }
        ],
        portion: {
            type: Number,
            //required: true
        },
        categories: {
            type: Array
        },
        comments: {
            type: Array
        },
        likes: {
            type: Array
        }
    });

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;