const router = require('express').Router();
const recipeService = require('../services/recipeService.js');

router.get('', async (req, res) => {
    try {
        const recipes = await recipeService.getAll();
        if (recipes.status === 'ok') {
            res.json(recipes);
        }

    }
    catch (err) {
        console.log(err);
        res.json({ status: 'ok', err });
    }
});
router.get('/:_id', async(req,res) => {
    const { _id } = req.params;

    try {
        const recipes = await recipeService.getOne(_id);
        if (recipes.status === 'ok') {
            res.json(recipes);
        }
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'ok', err });
    }
})
router.post('/create', async (req, res) => {
    const { name, userId, createdBy, portions, image, category, instructions } = req.body.recipeInfo;
    console.log(req.body);
    try {
        const result = await recipeService.createRecipe({ name, userId, createdBy, portions, image, category, instructions });
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'err', err });
    }
});
router.post('/:_id/like', async (req, res) => {
    const { _id } = req.params._id;
    const { userId } = req.body;
    try {
        let result = await recipeService.likeRecipe(_id, userId);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'err', err });
    }
});
router.get('/test', (req, res) => {
    res.json({ status: 'ok' })
})

module.exports = router;