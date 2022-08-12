const Comment = require('../models/Comment.js');
const Product = require('../models/Product.js');

const addComment = async ({ productId, userId, username, text }) => {
    try {
        let product = await Product.findById(productId);

        if (product) {
            let newComment = await new Comment({ username, text, userId });
            await newComment.save();
            
            product.comments.push(newComment);
            await product.save();

            return { status: 'ok', newComment };
        }
        else {
            return { status: 'err', err: 'No such product' };
        }
    }
    catch (err) {
        console.log(err);
        return { status: 'err', err };
    }
}

const deleteComment = async (commentId, productId) => {
    let _id = productId;

    try {
        let product = await Product.findById({ _id });
        let index = product.comments.findIndex(x => x._id.toString() === commentId);

        await Comment.findByIdAndRemove({ _id: commentId });
        product.comments.splice(index, 1);

        await product.save();

        return { status: 'ok' }
    }
    catch (err) {
        console.log(err);
        return { status: 'err' };
    }
}

const commentService = {
    addComment,
    deleteComment,
}

module.exports = commentService;