const express = require("express");
const db = require("../server/database/database.js");
const databaseManager = new db.DatabaseManager();

const path = require("path");

const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5100;

// To be able to access the server from the frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend's exact URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.post("/save", (req, res) => {
  const { title, content, date } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  databaseManager.addBlock(title, content, date);
  res.status(200).json({ message: "Block saved successfully" });
});

app.get("/blocks", async (req, res) => {
  try {
    const blocks = await databaseManager.getBlocks();
    res.status(200).json(blocks);
  } catch (error) {
    console.error("Error fetching blocks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use(express.static(path.join(__dirname, "./dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
