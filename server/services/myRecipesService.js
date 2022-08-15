const Recipe = require("../models/Recipe.js");

const getAll = async (_id) => {
    try {
        await Recipe.find({ userId: _id }).lean();

        return { status: 'ok' };

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
const deleteRecipe = async (_id) => {
    try {
        await Recipe.findByIdAndRemove({ _id });

        return { status: 'ok' };

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