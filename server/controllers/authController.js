const router = require('express').Router();
const SALT = require('../constants.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const authService = require('../services/authService.js');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = authMiddleware.hashedPassword(password, SALT);

    try {
        const response = await authService.register(username, hashedPassword);
        res.json(response)
    }
    catch (err) {
        res.json({ status: 'err', err })
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await authService.register(username, password);
        res.json(response);
    }
    catch (err) {
        res.json({ status: 'err', err })
    }
})
module.exports = router;