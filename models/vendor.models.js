const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const table_name = 'vendor';
const Vendor = sequelize.define(table_name, {
    vendor_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        // defaultValue: 1,
    }

})
module.exports = Vendor;