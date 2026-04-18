const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sweety@28', 
    database: 'task_db'
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL Database.");
});

// LOGIN: Checks email and password
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM Users WHERE email = ? AND password = ?", [email, password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) res.json({ success: true, user: results[0] });
        else res.json({ success: false, message: "Invalid email or password" });
    });
});

// TASKS: Get all tasks for the logged-in user
app.get('/tasks/:userId', (req, res) => {
    db.query("SELECT * FROM Tasks WHERE user_id = ?", [req.params.userId], (err, data) => {
        if (err) return res.status(500).send(err);
        res.json(data);
    });
});

// ADD: Create new task
app.post('/add-task', (req, res) => {
    const { user_id, task_name } = req.body;
    db.query("INSERT INTO Tasks (user_id, task_name) VALUES (?, ?)", [user_id, task_name], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Task Added" });
    });
});

// COMPLETE & DELETE
app.put('/complete-task/:id', (req, res) => {
    db.query("UPDATE Tasks SET status = 'completed' WHERE task_id = ?", [req.params.id], () => res.json({message: "OK"}));
});
app.delete('/delete-task/:id', (req, res) => {
    db.query("DELETE FROM Tasks WHERE task_id = ?", [req.params.id], () => res.json({message: "OK"}));
});

app.listen(3000, () => console.log("Server running: http://localhost:3000"));