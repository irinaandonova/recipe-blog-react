const commentService = require('../services/commentService.js');
const router = require('express').Router();

router.post('/:productId/add', async (req, res) => {
    const { userId, productId, text, username } = req.body;
    try {
        let response = await commentService.addComment({productId, userId, username, text});
        res.json({ status: response.status, comment: response.newComment });
    }
    catch (err) {
        console.log(err);
        return { status: 'error' }
    }

});
router.post('/:commentId/delete', async(req, res) => {
    const { commentId } = req.params;
    const { productId } = req.body;

    try {
        let response = await commentService.deleteComment(commentId, productId);
        res.json({ status: 'ok', response});
    }
    catch (err) {
        console.log(err);
        return { status: 'error' }
    }  
})

module.exports = router;