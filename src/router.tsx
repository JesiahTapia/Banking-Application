import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AccountPage from "./components/AccountPage";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage route */}
        <Route path="/" element={<HomePage />} />

        {/* Account route (rendered only if logged in) */}
        {isLoggedIn && <Route path="/account" element={<AccountPage />} />}

        {/* Login route (for demonstration purposes) */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
