const authMiddleware = require('../middlewares/authMiddleware.js');
const User = require('../models/User');

const register = async (username, hashedPassword, email) => {
    console.log(username, hashedPassword, email);
    try {
        const user = await new User({ username, password: hashedPassword, email });
        await user.save();

        return { status: 'ok', user }
    }
    catch (err) {
        console.log(err);
        return { status: 'err', message: err.message };
    }
}

const login = async ({ username, password }) => {
    try {
        const user = await User.findOne({ username });

        if (await authMiddleware.comparePassword(password, user.password)) {
            return { status: 'ok', user }
        }
        else {
            return { status: 'err', message: 'Wrong username or passord' }
        }
    }
    catch (err) {
        console.log(err);
        return { status: 'err', message: err.message };
    }
}

const authService = {
    register,
    login
}

module.exports = authService;