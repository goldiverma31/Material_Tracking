const sequelize = require('../config/database');
const Sequelize = require('sequelize');
const User = require('./user.model');
const table_name = 'reset_password_token';

const ResetPasswordToken = sequelize.define(table_name, {
    reset_password_token_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    reset_token: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
});

ResetPasswordToken.belongsTo(User, {
    foreignKey: { name: 'user_id' },
});
module.exports = ResetPasswordToken;