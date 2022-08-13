const bcrypt = require('bcrypt');

const hashedPassword = async({password, SALT}) => {
    return await bcrypt.hash(password, 10)
}
const comparePassword = async(plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
const authMiddleware = {
    hashedPassword,
    comparePassword
}

module.exports = authMiddleware;