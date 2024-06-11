import express from "express";
import dotenv from "dotenv";
import mysql, { RowDataPacket } from "mysql2";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
    return;
  }
  console.log("Connected to database successfully");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("Received login request with username:", username);

  connection.query('SELECT * FROM accounts WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).send("Error querying the database");
      return;
    }

    console.log("Database query results:", results);

    // Type assertion to RowDataPacket[]
    const userData: RowDataPacket[] = results as RowDataPacket[];
    
    if (userData.length === 0) {
      console.log("No user found with username:", username);
      res.status(401).send("Invalid username or password");
      return;
    }

    const user = userData[0];
    if (user.password !== password) {
      console.log("Incorrect password for user:", username);
      res.status(401).send("Invalid username or password");
      return;
    }

    console.log("User logged in successfully:", username);
    res.json({ success: true, userId: user.id });
  });
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
