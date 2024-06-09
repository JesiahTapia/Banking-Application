import React, { useState } from "react";
import pool from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM accounts WHERE username = ? AND password = ?",
        [username, password]
      );
      connection.release(); // Always release the connection back to the pool

      if (Array.isArray(rows) && rows.length > 0) {
        // Login successful
        onLogin(); // Trigger callback function to indicate successful login
      } else {
        // Login failed
        // Handle invalid credentials
        alert("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error executing SQL query:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
