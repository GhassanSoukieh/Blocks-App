const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error opening database:', err.message);
    else console.log('Connected to SQLite database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      completed BOOLEAN DEFAULT 0
    )`);
  });


  class databaseManger{
    


  }
  
  module.exports = db;