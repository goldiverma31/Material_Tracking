const logger = require('../config/logger');
const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');
const pg = require('pg');

const dbHost = "localhost";
const dbDatabase = "Material_system";
const dbUser = "postgres";
const dbPassword = "goldi";
const dbDialect = "postgres";

exports.pgPool = new pg.Pool({
    host: dbHost,
    database: dbDatabase,
    user: dbUser,
    password: dbPassword,
    dialect: dbDialect,
}).connect(function (err) {
    if (err) throw err;
    console.log("[database connection ] SUCCESSFULLY ....");
});
logger.info(
    `Printing process env attributes : ${dbHost}, ${dbDatabase}, ${dbUser}, ${dbPassword},  ${dbDialect}`
);

let conn;
conn = new Sequelize(dbDatabase, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    logging: false,
    // pool: {
    //     max: 10,
    //     min: 5,
    //     idle: 10000
    // }
});
logger.info(`${dbDatabase} connected`);

conn
    .authenticate()
    .then(() => {
        console.log('sequelize connected successfully...!');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = conn;