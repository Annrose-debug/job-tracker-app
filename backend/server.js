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


// route for database (post request) 
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

// for the get query 
app.get("/jobs", (req, res) => {
  const sql = "SELECT * FROM jobs";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching jobs");
    } else {
      res.json(results);
    }
  });
});


// this allows you to change the job status 
app.put("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE jobs SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("Error updating job:", err);
      res.status(500).send("Error updating job");
    } else {
      res.send("Job updated successfully ✅");
    }
  });
});


// can delete jobs with this method 
app.delete("/jobs/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM jobs WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting job:", err);
      res.status(500).send("Error deleting job");
    } else {
      res.send("Job deleted successfully 🗑️");
    }
  });
});


// port 
const PORT = 5000;

// start the server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
