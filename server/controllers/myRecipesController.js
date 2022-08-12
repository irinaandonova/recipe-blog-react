const router = require('express').Router();
const myRecipesService = require("../services/myRecipesService.js");

router.post('/edit', async(req, res) => {
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
router.delete('/delete/:_id', async(req, res) => {
    const { _id } = req.params._id;

    try {
        const result = await myRecipesService.deleteRecipe(_id);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'err', err });
    }
});

module.exports = router;