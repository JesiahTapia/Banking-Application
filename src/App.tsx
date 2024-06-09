import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AccountPage from "./components/AccountPage";
import Login from "./components/Login";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Update authentication state upon successful login
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <h1>Welcome to the Banking App</h1>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/account">Account</a>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <HomePage /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/account"
            element={
              isLoggedIn ? <AccountPage /> : <Login onLogin={handleLogin} />
            }
          />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
