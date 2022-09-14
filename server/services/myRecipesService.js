const Recipe = require("../models/Recipe.js");

const getAll = async (userId) => {
    try {
        const recipes = await Recipe.find({}).lean();
        const myRecipes = recipes.filter(x => x.userId.toString() == userId);
        return { status: 'ok', myRecipes };

    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const editRecipe = async ({ userId, recipe }) => {
    try {
        const databaseRecipe = await Recipe.findByIdAndUpdate({ _id: recipe._id }, recipe);
        if (userId === recipe.userId) {
            return { status: 'ok', recipe: databaseRecipe };
        }
        else {
            return { status: 'err', err: 'Unauthorized request!' }
        }
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const deleteRecipe = async (_id, userId) => {
    try {
        const recipe = await Recipe.findById({ _id });
        if (recipe.userId.toString() === userId) {
            await Recipe.deleteOne({ _id });
            
            return { status: 'ok' };
        }
        else {
            return { status: 'err', err: 'Unauthorized request!' }
        }
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}

const myRecipesService = {
    getAll,
    editRecipe,
    deleteRecipe
}
module.exports = myRecipesService;