const { Sequelize } = require("sequelize");

const db = new Sequelize("attendance_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = db;