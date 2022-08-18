const router = require('express').Router();
const commentService = require('../services/commentService.js');

router.post('/add', async (req, res) => {
    const { userId, comment, recipeId, username } = req.body.commentInfo;
    console.log(req.body);
    try {
        const result = await commentService.addComment(recipeId, userId, comment, username);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'err', err });
    }
});
router.post('/:_id/edit', async(req, res) => {
    const { _id } = req.params;
    const { commentId, userId, text } = req.body;

    try {
        const result = await commentService.editComment(_id, userId, text);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'err', err });
    }
});
router.delete('/:commentId/delete', async(req, res) => {
    const { commentId } = req.params;
    const { recipeId } = req.body;
    console.log(req.params);
    console.log(req.body);
    try {
        const result = await commentService.deleteComment({ commentId, recipeId });
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'err', err });
    }
});

module.exports = router;