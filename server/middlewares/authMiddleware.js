const bcrypt = require('bcrypt');

const hashPassword = async(password, SALT) => {
    let hashedPassword = await bcrypt.hash(password, SALT)
   
    return hashedPassword;
}

const comparePassword = async(password, hashedPassword) => {
    let result = await bcrypt.compare(password, hashedPassword);
    
    return result;
}
const authMiddleware = {
    hashPassword,
    comparePassword
}

module.exports = authMiddleware;
