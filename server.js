// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the SQLite databases
const jafraDb = new sqlite3.Database('jafra_admin.db');
const adminUsersDb = new sqlite3.Database('admin_users.db');

app.use(cors());

const publicDirectoryPath = path.join(__dirname);

app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

// Route to fetch data from Jafra Admin database
app.get('/jafra_admin_data', (req, res) => {
  const query = 'SELECT id, username, password FROM users'; // Modify query as per your schema
  jafraDb.all(query, (err, rows) => {
    if (err) {
      console.error('Error fetching Jafra Admin data:', err);
      res.status(500).send('Internal server error');
    } else {
      res.json(rows);
    }
  });
});

// Route to fetch data from Admin Users database
app.get('/admin_users_data', (req, res) => {
  const query = 'SELECT id, username, password FROM users'; // Modify query as per your schema
  adminUsersDb.all(query, (err, rows) => {
    if (err) {
      console.error('Error fetching Admin Users data:', err);
      res.status(500).send('Internal server error');
    } else {
      res.json(rows);
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const queryJafra = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const queryAdmin = 'SELECT * FROM users WHERE username = ? AND password = ?';
  jafraDb.get(queryJafra, [username, password], (err, row) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).send('Internal server error');
    }
    if (row) {
      res.send('/dashboard.html'); // Redirect to dashboard.html
    } else {
      adminUsersDb.get(queryAdmin, [username, password], (err, row) => {
        if (err) {
          console.error('Error executing query', err);
          return res.status(500).send('Internal server error');
        }
        if (row) {
          res.send('/admin_users.html'); // Redirect to admin_users.htmla
        } else {
          res.status(401).send('Invalid username or password.');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
