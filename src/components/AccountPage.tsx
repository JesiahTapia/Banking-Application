import React, { useState, useEffect } from "react";

const AccountPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null); // Change 'any' to the type of your user info object

  useEffect(() => {
    // Fetch user's account information from the server
    fetchUserInfo();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const fetchUserInfo = async () => {
    try {
      // Make a GET request to your server endpoint to fetch user's account info
      const response = await fetch("/api/user/account"); // Change the URL to your actual endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch user account information");
      }
      const data = await response.json();
      setUserInfo(data); // Assuming data is an object containing user's account info
    } catch (error) {
      console.error("Error fetching user account information:", error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const { account_id, firstname, lastname, account_balance } = userInfo;

  return (
    <div>
      <h2>Account Page</h2>
      <p>ID: {account_id}</p>
      <p>
        Name: {firstname} {lastname}
      </p>
      <p>Balance: ${account_balance}</p>
    </div>
  );
};

export default AccountPage;
