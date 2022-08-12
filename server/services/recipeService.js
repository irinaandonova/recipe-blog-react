const Recipe = require("../models/Recipe.js");

const getAll = async() => {
    try {
        const recipes = await Recipe.find().lean();
        return { status: 'ok', recipes };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const addRecipe = async ({ userId, recipe }) => {
    try {
        const savedRecipe = await Recipe(userId, recipe);
        return { status: 'ok', recipe: savedRecipe };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const likeRecipe = async ({ userId, recipeId }) => {
    try {
        const recipeInfo = await Recipe.findById({ recipeId });
        if (recipeInfo.userId === userId) {
            return { status: 'err', err: "Cannot like own recipe!" };
        }
        else {
            let index = recipeInfo.likes.findIndex(x => x === userId);
            if (index === -1) {
                recipeInfo.likes.push(userId);
                await recipeInfo.save();
                return { status: 'ok' }
            }
            else {
                recipeInfo.likes.splice(index, 1);
                await recipeInfo.save();
                return { status: 'ok' }
            }
        }
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}

const recipeService = {
    getAll,
    addRecipe,
    likeRecipe,
}

module.exports = recipeService;