// importing packages (express and cors) 
const express = require('express');
const cors = require('cors');

// creating the app 
const app = express();


// middleware setup 
app.use(cors());
app.use(express.json());

// creating route 
app.get("/", (req, res) => {
    res.send("Job Tracker API is running")
});

// port 
const PORT = 5000;

// start the server
app.listen(PORT, () => {
    console.log('server is running on port ${PORT}');
});
