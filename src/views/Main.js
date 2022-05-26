import React, { useState } from "react";
import { Navbar, MainMint } from "../components";

const Main = () => {
  const [accounts, setAccounts] = useState([]);

  return (
    <div>
      <Navbar active="mint" />
      <MainMint />
    </div>
  );
};

export default Main;
