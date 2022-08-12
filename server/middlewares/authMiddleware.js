const bcrypt = require('bcrypt');

const hashedPassword = async({password, SALT}) => {
    return await bcrypt.hash(password, 10)
}
const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
}
const authMiddleware = {
    hashedPassword,
    comparePassword
}

module.exports = authMiddleware;