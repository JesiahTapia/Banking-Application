import React, { useState } from "react";
import pool from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook to navigate

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Sending login request with username:", username);
      console.log("Sending login request with password:", password);

      const connection = await pool.getConnection();
      console.log("Connection established");

      const [rows] = await connection.execute<RowDataPacket[]>(
        "SELECT * FROM accounts WHERE username = ? AND password = ?",
        [username, password]
      );
      connection.release(); // Always release the connection back to the pool

      console.log("Rows:", rows);

      if (Array.isArray(rows) && rows.length > 0) {
        // Login successful
        console.log("Login successful:", rows);
        onLogin(); // Trigger callback function to indicate successful login
        navigate("/account"); // Navigate to the account page
      } else {
        // Login failed
        console.log("Login failed");
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
