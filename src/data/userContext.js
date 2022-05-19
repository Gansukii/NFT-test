import React from "react";

const UserContext = React.createContext({
  accounts: [],
  setAccounts: () => {},
});

export default UserContext;
