const router = require('express').Router();
const commentService = require('../services/commentService.js');

router.post('/add', async (req, res) => {
    const { userId, text, productId } = req.body;
    try {
        const result = await commentService.addComment(productId, userId, text);
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
router.delete('/:_id/delete', async(req, res) => {
    const { _id } = req.params;

    try {
        const result = await commentService.deleteComment(_id);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'err', err });
    }
});

module.exports = router;