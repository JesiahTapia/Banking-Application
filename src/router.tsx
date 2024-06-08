import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import AccountPage from "./AccountPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" Component={HomePage} />
        <Route path="/account" Component={AccountPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
