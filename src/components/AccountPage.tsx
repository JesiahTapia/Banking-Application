// src/components/Account.tsx
import React, { useContext, useState } from "react";
import { BankContext } from "../BankInfo";

const AccountPage: React.FC = () => {
  const bankContext = useContext(BankContext);
  const [amount, setAmount] = useState<number>(0);

  if (!bankContext) {
    return <div>Loading...</div>;
  }

  const { balance, deposit, withdraw } = bankContext;

  return (
    <div>
      <h2>Account Page</h2>
      <p>Balance: ${balance}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <button onClick={() => deposit(amount)}>Deposit</button>
      <button onClick={() => withdraw(amount)}>Withdraw</button>
    </div>
  );
};

export default AccountPage;
