import React, { useState } from "react";
import { Navbar, MainMint } from "../components";

const Main = () => {
  const [accounts, setAccounts] = useState([]);

  return (
    <div>
      <Navbar />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
};

export default Main;
