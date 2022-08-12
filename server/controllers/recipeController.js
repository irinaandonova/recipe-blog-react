const router = require('express').Router();
const recipeService = require('../services/recipeService.js');

router.get('', async (req, res) => {
    try {
        const recipes = await recipeService.getAll();
        if(recipes.status === 'ok') {
            res.json(recipes);
        }
        
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'ok', err });
    }
});
router.post('/add', async(req, res) => {
    const { userId, recipe } = req.body;

    try {
        const result = await recipeService.addRecipe(userId, recipe);
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
res.json({status: 'ok'})
})

module.exports = router;