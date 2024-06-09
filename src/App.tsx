import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountPage from "./components/AccountPage";
import Login from "./components/Login";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Update authentication state upon successful login
    setIsLoggedIn(true);
    // No need to redirect using useHistory, handle navigation directly within the component
  };

  return (
    <Router>
      <div>
        <h1>Welcome to the Banking App</h1>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <AccountPage /> : <Login onLogin={handleLogin} />
            }
          />
        </Routes>
        {!isLoggedIn && <button onClick={handleLogin}>Login</button>}
      </div>
    </Router>
  );
};

export default App;
