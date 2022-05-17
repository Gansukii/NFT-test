import { useEffect, useState } from "react";
import "./App.css";
import MainMint from "./MainMint";
import Navbar from "./Navbar";

function App() {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const storageAccount = localStorage.getItem("currentAccount") || "";
    if (storageAccount) {
      setAccounts([storageAccount]);
    }
  }, []);
  return (
    <div className="App">
      <Navbar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}

export default App;
