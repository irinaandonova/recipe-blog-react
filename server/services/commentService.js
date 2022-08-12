const Recipe = require('../models/Recipe.js');

const addComment = async (productId, userId, text) => {
    try {
        const recipeInfo = await Recipe.findById({ _id: productId });
        const comment = { userId, text };
        recipeInfo.comments.push(comment);
        await recipeInfo.save();
        return { status: 'ok', comment: recipeInfo.comment };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const editComment = async ({ _id, commentId, userId, text }) => {
    try {
        const recipe = await Recipe.findById({ _id });

        if (recipe.userId !== userId) {
            return { status: 'err', err: 'Unauthorized reqest!' };
        }
        const comment = recipe.comments.filter(x => x._id === commentId);
        comment.text = text;

        await recipe.save();
        return { status: 'ok' };
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}
const deleteComment = async ({ _id, commentId }) => {
    try {
        const recipe = await Recipe.findById({ _id });

        if (recipe.userId !== userId) {
            return { status: 'err', err: 'Unauthorized reqest!' };
        }
        const index = recipe.comments.findIndex(x => x._id === commentId);
        if (index !== -1) {
            recipe.comment[index].splice(index, 1);
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