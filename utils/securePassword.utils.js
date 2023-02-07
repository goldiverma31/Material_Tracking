const bcrypt = require('bcrypt');

const securePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const comparePassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return result;
};

module.exports = { securePassword, comparePassword };
