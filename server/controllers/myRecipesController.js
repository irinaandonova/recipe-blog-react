const router = require('express').Router();
const myRecipesService = require("../services/myRecipesService.js");

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await myRecipesService.getAll(userId);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'err', err });
    }
});
router.post('/edit', async (req, res) => {
    const { userId, recipe } = req.body;

    try {
        const result = await myRecipesService.editRecipe(userId, recipe);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'err', err });
    }
});
router.delete('/delete/:_id', async (req, res) => {
    const { _id } = req.params;
    const { userId } = req.body;

    try {
        const result = await myRecipesService.deleteRecipe(_id, userId);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'err', err });
    }
});

module.exports = router;