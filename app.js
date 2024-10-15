const express = require('express');
const mysql = require('mysql2');

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
      console.error('Error connecting to the database: ' + err.stack);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Connected to database.');
      startApp(connection);
    }
  });
}

function startApp(connection) {
  app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
  });

  app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error fetching users' });
      } else {
        res.json(results);
      }
    });
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

connectWithRetry();
