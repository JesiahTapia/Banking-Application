import React from "react";
import Header from "./Header";
import AppRouter from "./Router";
import BankProvider from "./BankInfo";

const App: React.FC = () => {
  return (
    <BankProvider>
      <Header />
      <AppRouter />
    </BankProvider>
  );
};

export default App;
