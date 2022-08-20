const Recipe = require('../models/Recipe.js');

const addComment = async (recipeId, userId, comment, username) => {
    try {
        const recipeInfo = await Recipe.findById({ _id: recipeId });
        const commentInfo = { userId, comment, username };
        const createdAt = new Date();
        commentInfo.createdAt = createdAt;
        recipeInfo.comments.push(commentInfo);
        await recipeInfo.save();
        return { status: 'ok', comment: recipeInfo.comments[recipeInfo.comments.length - 1] };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const editComment = async ({ commentId, recipeId, text }) => {
    try {
        
        const recipe = await Recipe.findById({ _id: recipeId });

       
        const commentInfo = recipe.comments.filter(x => x._id.toString() === commentId)[0];
        commentInfo.comment = text;
        commentInfo.createdAt = new Date();
        
        await recipe.save();
        return { status: 'ok', comment: commentInfo };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const deleteComment = async ({ commentId, recipeId }) => {
    try {
        const recipe = await Recipe.findById({ _id: recipeId });
        
        const index = recipe.comments.findIndex(x => x._id.toString() === commentId);
        
        if (index !== -1) {
            recipe.comments.splice(index, 1);
        }

        await recipe.save();
        return { status: 'ok' };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}

const commentService = {
    addComment,
    editComment,
    deleteComment
}

module.exports = commentService;