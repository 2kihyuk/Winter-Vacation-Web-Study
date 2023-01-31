const mysql = require("mysql2/promise");

exports.pool = mysql.createPool({
    host: "43.200.211.181",
    user: "client",
    port: "3306",
    password: "123456",
    database: "MyTodoDB"
});