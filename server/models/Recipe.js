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
        username: {
            type: String
        },
        createdBy: {
            type: String,
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
            maxLength: 2000
        },
        comments: [
            {
                userId: {
                    type: mongoose.Types.ObjectId,
                    required: true,
                    ref: 'User'
                },
                comment: {
                    type: String,
                    minlength: 1,
                    maxlength: 50,
                },
                username: {
                    type: String,
                },
                createdAt: {
                    type: Date
                }
            },
        ],
        likes: {
            type: Array
        }
    }, );

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;