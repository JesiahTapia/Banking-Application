import React, { useContext } from "react";
import { BankInfo } from "./BankInfo";

const AccountPage: React.FC = () => {
  const bankContext = useContext(BankInfo);

  if (!bankContext) {
    return <div>Loading...</div>;
  }

  const { balance, deposit, withdraw } = bankContext;

  return (
    <div>
      <h2>Account Summary</h2>
      <p>Balance: ${balance}</p>
      <button onClick={() => deposit(100)}>Deposit $100</button>
      <button onClick={() => withdraw(100)}>Withdraw $100</button>
    </div>
  );
};

export default AccountPage;
