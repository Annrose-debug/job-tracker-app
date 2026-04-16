// importing mysql library 
const mysql = require('mysql2');

// creating connection 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Annie",
    database: "job_tracker"
});

// connecting to db 
db.connect((err) => {
    if (err) {
        console.log("Connection failure:", err);
    } 
    else {
        console.log("Connected to MYSQL");
    }
});

// export connection 
module.exports = db;