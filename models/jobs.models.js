const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const table_name = 'jobs';
const Jobs = sequelize.define(table_name, {
    job_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    job_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    job_no: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
})
module.exports = Jobs;