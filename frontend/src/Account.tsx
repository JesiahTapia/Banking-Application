import React, { useEffect, useState } from "react";
import { getAccount } from "./api";

interface AccountProps {
  userId: number;
}

interface Account {
  id: number;
  username: string;
  balance: number;
}

const Account: React.FC<AccountProps> = ({ userId }) => {
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const data = await getAccount(userId);
        setAccount(data);
      } catch (err) {
        console.error("Error fetching account:", err);
      }
    };

    fetchAccount();
  }, [userId]);

  if (!account) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Account Information</h1>
      <p>Username: {account.username}</p>
      <p>Balance: ${account.balance}</p>
    </div>
  );
};

export default Account;
