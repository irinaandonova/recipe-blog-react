const Recipe = require("../models/Recipe.js");

const getRecipes = async (category) => {

    try {
        let recipes = await Recipe.find().lean();
        if (category) {
            recipes = recipes.filter(x => x.category === category);
        }
        return { status: 'ok', recipes };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const getOne = async (_id) => {
    try {
        const recipe = await Recipe.findById({ _id });
        return { status: 'ok', recipe };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const createRecipe = async ({ name, userId, createdBy, portions, image, category, instructions, ingredients }) => {
    try {
        const savedRecipe = await new Recipe({ name, userId, createdBy, portions, image, category, instructions, ingredients });
        await savedRecipe.save();

        return { status: 'ok' };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const likeRecipe = async ({ userId, _id }) => {
    console.log(userId, _id);
    try {
        const recipeInfo = await Recipe.findById({ _id });
        if (recipeInfo.userId.toString() === userId) {
            return { status: 'err', msg: "Cannot like own recipe!" };
        }
        else {
            let index = recipeInfo.likes.findIndex(x => x.toString() === userId);
            if (index === -1) {
                recipeInfo.likes.push(userId);
                await recipeInfo.save();
                const likes = recipeInfo.likes;

                return { status: 'ok', likes }
            }
            else {
                recipeInfo.likes.splice(index, 1);
                await recipeInfo.save();
                const likes = recipeInfo.likes;
                return { status: 'ok', likes }
            }
        }
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const getLikedRecipes = async (_id) => {
    try {
        const allRecipes = await Recipe.find({}).lean();
        const likedRecipes = allRecipes.filter(x => x.likes = _id.toString());

        return { status: 'ok', likedRecipes };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const rateRecipe = async ({ recipeId, userId, rating }) => {
    try {
        const recipe = await Recipe.findById({ _id: recipeId });

        
        const index = recipe.rating.findIndex(x => x.userId.toString() === userId);
        if (index === -1) {
            recipe.rating.push({ userId, rating });
        }
        else {
            recipe.rating.splice(index, 1, {recipeId, userId, rating});
        }

        await recipe.save();
        return { status: 'ok', rating: recipe.rating };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}

const recipeService = {
    getRecipes,
    getOne,
    createRecipe,
    likeRecipe,
    getLikedRecipes,
    rateRecipe
}

module.exports = recipeService;