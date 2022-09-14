const router = require('express').Router();
const SALT = require('../constants.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const authService = require('../services/authService.js');

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body.user;
    const hashedPassword = await authMiddleware.hashedPassword({ password, SALT });

    try {
        const response = await authService.register(username, hashedPassword, email);
        res.json(response);
    }
    catch (err) {
        res.json({ status: 'err', err })
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const response = await authService.login({ username, password });
        res.json(response);
    }
    catch (err) {
        res.json({ status: 'err', err })
    }
})
module.exports = router;