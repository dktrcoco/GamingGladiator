//Import MySQL connection
var connection = require("../config/connection.js");

//function to print question marks required for the SQL query
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

//function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    //loop through the key and push the key/value
    for (var key in ob) {
        var value = ob[key];

        //if the submitted burger name has spaces, adds quotations around it
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

//Object for SQL statement functions
var orm = {
    all: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, results) {
            if (err) {
                throw err;
            }
            cb(results);
        });
    },
    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, results) {
            if (err) {
                throw err;
            }

            cb(results);
        });
    },
    update: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, results) {
            if (err) {
                throw err;
            }
            cb(results);
        });
    },
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += "WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, results) {
            if (err) {
                throw err;
            }

            cb(results);
        });
    }
};

//Export the ORM object for the model
module.exports = orm;