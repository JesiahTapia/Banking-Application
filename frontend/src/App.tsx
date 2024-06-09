import React, { useState } from "react";
import Login from "./Login";
import Account from "./Account";

const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);

  const handleLogin = (id: number) => {
    setUserId(id);
  };

  return (
    <div className="App">
      {userId ? <Account userId={userId} /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;
