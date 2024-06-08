import React, { createContext, useState } from "react";

interface BankInfoProps {
  balance: number;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => void;
}

export const BankInfo = createContext<BankInfoProps | undefined>(undefined);

const BankProvider: React.FC = ({ children }) => {
  const [balance, setBalance] = useState<number>(1000);

  const deposit = (amount: number) => setBalance(balance + amount);
  const withdraw = (amount: number) => setBalance(balance - amount);

  return (
    <BankInfo.Provider value={{ balance, deposit, withdraw }}>
      {children}
    </BankInfo.Provider>
  );
};

export default BankProvider;
