import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../data/userContext";

const Navbar = () => {
  const { accounts, setAccounts } = useContext(UserContext);
  const isConnected = Boolean(accounts[0]);
  console.log(accounts);

  useEffect(() => {
    const storageAccount = localStorage.getItem("currentAccount") || "";
    if (storageAccount) {
      setAccounts([storageAccount]);
    }
  }, []);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
      localStorage.setItem("currentAccount", accounts[0]);
    }
  }

  const logoutAccount = () => {
    localStorage.removeItem("currentAccount");
    setAccounts([]);
    window.location.reload();
  };

  return (
    <div>
      <div>Home</div>
      <div>About</div>
      <div>
        <Link to="./battle">Battle</Link>
      </div>

      {isConnected ? (
        <div>
          Connected as <b>{accounts[0]}</b>
          <button onClick={logoutAccount}>Logout</button>
        </div>
      ) : (
        <button onClick={connectAccount}>connect to account</button>
      )}
    </div>
  );
};

export default Navbar;
