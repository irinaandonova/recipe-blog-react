const bcrypt = require('bcrypt');

const hashedPassword = (password, SALT) => {
    return bcrypt.hash(password, SALT);
}
const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
}
const authMiddleware = {
    hashedPassword,
    comparePassword
}

module.exports = authMiddleware;