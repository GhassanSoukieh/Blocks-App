const sqlite3 = require("sqlite3").verbose();
const dbPath = "./database.sqlite";

// Initialize the database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create the `blocks` table if it doesn't exist
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS blocks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        date TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Blocks table created successfully.");
      }
    }
  );
});

// Define the DatabaseManager class
class DatabaseManager {
  constructor() {
    this.db = db; // Assign the database instance to the class
  }

  addBlock(title, content, date) {
    const query = `INSERT INTO blocks (title, content, date) VALUES (?, ?, ?)`;
    this.db.run(query, [title, content, date], function (err) {
      if (err) {
        console.error("Error inserting block:", err.message);
      } else {
        console.log(`Block added with ID: ${this.lastID}`);
      }
    });
  }
  async getBlocks() {
    const query = `SELECT * FROM blocks`;
    return new Promise((resolve, reject) => {
      this.db.all(query, [], (err, rows) => {
        if (err) {
          console.error("Error fetching blocks:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

// Export the DatabaseManager class and the database instance
module.exports = {
  DatabaseManager,
  db,
};
