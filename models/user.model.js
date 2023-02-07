const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const table_name = 'users';
const Users = sequelize.define(table_name, {
    user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Role: {
        type: Sequelize.STRING,
        allowNull: true
    },
    DOB: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
        // default: null
    }
    // created_by: {
    //     type: Sequelize.UUID,
    //     allowNull: true,
    // },
    // updated_by: {
    //     type: Sequelize.UUID,
    //     allowNull: true,
    // },

})
module.exports = Users;
