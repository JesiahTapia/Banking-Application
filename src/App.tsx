import React from "react";
import AppRouter from "./Router";
import BankProvider from "./BankInfo";

const App: React.FC = () => {
  return (
    <BankProvider>
      <Header />
      <AppRouter />
      <Footer />
    </BankProvider>
  );
};

export default App;
