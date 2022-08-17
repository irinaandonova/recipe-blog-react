const router = require('express').Router();
const recipeService = require('../services/recipeService.js');

router.get('', async (req, res) => {
    try {
        const recipes = await recipeService.getRecipes();
        if (recipes.status === 'ok') {
            res.json(recipes);
        }

    }
    catch (err) {
        console.log(err);
        res.json({ status: 'ok', err });
    }
});
router.get('/details/:_id', async(req,res) => {
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
    const { name, userId, createdBy, portions, image, category, instructions, ingredients } = req.body.recipeInfo;
    console.log(req.body);
    try {
        const result = await recipeService.createRecipe({ name, userId, createdBy, portions, image, category, instructions, ingredients });
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
router.get('/:category', async(req, res) => {
    const { category } = req.params;
    try {
        let result = await recipeService.getRecipes(category);
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'err', err });
    } 
})

module.exports = router;