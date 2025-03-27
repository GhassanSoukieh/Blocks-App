
const express = require('express');
const db = require('../server/database/database.js');

const path = require('path');

const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5100;

app.use(cors());

app.use(express.json());

app.get('/home', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});