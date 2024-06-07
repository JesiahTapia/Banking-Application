import React, { createContext, useState } from "react";

interface BankContextProps {
  balance: number;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
}

export const BankContext = createContext<BankContextProps | undefined>(
  undefined
);

const BankProvider: React.FC = ({ children }) => {
  const [balance, setBalance] = useState<number>(1000);

  const deposit = (amount: number) => setBalance(balance + amount);
  const withdraw = (amount: number) => setBalance(balance - amount);

  return (
    <BankContext.Provider value={{ balance, deposit, withdraw }}>
      {children}
    </BankContext.Provider>
  );
};

export default BankProvider;
