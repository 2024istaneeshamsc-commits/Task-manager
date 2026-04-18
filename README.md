Multi-User Task Management System
A robust task productivity web application built using HTML, CSS, JavaScript (Node.js), and MySQL.

 Features
User Authentication Simulation: Unique data views for different users.

Task Management: Full CRUD (Create, Read, Delete) functionality for tasks.

Status Tracking: Mark tasks as 'pending' or 'completed'.

Relational Integrity: Tasks are strictly linked to their respective owners.

Persistent Storage: Data remains safe in a MySQL database even after restarts.

 Tech Stack
Frontend: HTML5, CSS3, JavaScript (Vanilla)

Backend: Node.js (Express.js)

Database: MySQL (Managed via MySQL Workbench)

 System Flow
User → Input Task → Frontend (Fetch API) →
Backend (Express Route) → SQL Query Execution →
Database (MySQL Storage) → UI Refresh (State Update)

 Database Design
Tables:
users

user_id (Primary Key, Auto Increment)

username (VARCHAR)

email (VARCHAR, Unique)

tasks

task_id (Primary Key, Auto Increment)

user_id (Foreign Key referencing users)

task_name (VARCHAR)

status (ENUM: 'pending', 'completed')
