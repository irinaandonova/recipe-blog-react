const Recipe = require("../models/Recipe.js");

const getRecipes = async(category) => {
    
    try {
        let recipes = await Recipe.find().lean();
        if(category) {
            recipes = recipes.filter(x => x.category === category);
        }
        return { status: 'ok', recipes };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const getOne = async(_id) => {
    try {
        const recipe = await Recipe.findById({  _id });
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
    getRecipes,
    getOne,
    createRecipe,
    likeRecipe,
}

module.exports = recipeService;