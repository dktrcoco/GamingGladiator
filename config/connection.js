// This file initiates the connection to mysql
var mysql = require("mysql2");
var Sequelize = require("sequelize");

var connection;

//constructor function
var sequelize = new Sequelize("gamers_db", "root", "24DimethylPyrrole!", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        //this needs to match from MySQL
        port: 3306,
        user: "root",
        password: "Samson69.",
        database: "_db"
    });
}

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

//Export connection for ORM to use
module.exports = sequelize;
