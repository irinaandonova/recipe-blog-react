const router = require('express').Router();

const authController = require('./controllers/authController.js');
const recipeController = require('./controllers/recipeController.js');
const myRecipesController = require('./controllers/myRecipesController.js');
const commentController = require('./controllers/commentController.js');

router.use('/auth', authController);
router.use('/recipe', recipeController);
router.use('/my-recipes', myRecipesController);
router.use('/comment', commentController);

module.exports = router;