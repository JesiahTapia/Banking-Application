import React, { createContext, useState, ReactNode } from "react";

interface BankContextType {
  balance: number;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
}

export const BankContext = createContext<BankContextType | undefined>(
  undefined
);

const BankProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);

  const deposit = (amount: number) => {
    setBalance(balance + amount);
  };

  const withdraw = (amount: number) => {
    setBalance(balance - amount);
  };

  return (
    <BankContext.Provider value={{ balance, deposit, withdraw }}>
      {children}
    </BankContext.Provider>
  );
};

export default BankProvider;
