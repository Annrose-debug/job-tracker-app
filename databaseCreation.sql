CREATE DATABASE job_tracker;
use job_tracker;

CREATE TABLE jobs (
id INT AUTO_INCREMENT PRIMARY KEY,
company VARCHAR(255),
role VARCHAR(255),
status VARCHAR(50),
date_applied DATE,
notes TEXT
);