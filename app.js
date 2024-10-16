const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

function connectWithRetry() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'myapp'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Connected to database.');
      startApp(connection);
    }
  });
}

function startApp(connection) {
  app.use(express.json());

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.get('/api/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching users' });
      } else {
        res.json(results);
      }
    });
  });

  app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error adding user' });
      } else {
        res.status(201).json({ id: results.insertId, name, email });
      }
    });
  });

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

connectWithRetry();
