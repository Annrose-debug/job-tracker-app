// importing packages (express and cors) 
const express = require('express');
const cors = require('cors');
// added db import 
const db = require('./db');

// creating the app 
const app = express();


// middleware setup 
app.use(cors());
app.use(express.json());

// creating route 
app.get("/", (req, res) => {
    res.send("Job Tracker API is running")
});


// route for database 
app.post("/jobs", (req, res) => {
  const { company, role, status, date_applied, notes } = req.body;

  const sql = `
    INSERT INTO jobs (company, role, status, date_applied, notes)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [company, role, status, date_applied, notes], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error adding job");
    } else {
      res.send("Job added successfully");
    }
  });
});

// port 
const PORT = 5000;

// start the server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
