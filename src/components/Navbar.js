import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../data/userContext";

const Navbar = ({ active }) => {
  const { accounts, setAccounts } = useContext(UserContext);
  const isConnected = Boolean(accounts[0]);

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
    <div className="navbar">
      <div>
        <Link to="/" className={`navLink navItem ${active === "mint" ? "active" : ""}`}>
          Mint
        </Link>
      </div>
      <div>
        <Link to="./battle" className={`navLink navItem ${active === "battle" ? "active" : ""}`}>
          Battle
        </Link>
      </div>

      <div className="accountLogout">
        {isConnected ? (
          <div className="navAcc">
            <div className=" navItem account">
              Connected as:<b>{accounts[0]}</b>
            </div>
            <button className="navItem logout" onClick={logoutAccount}>
              Logout
            </button>
          </div>
        ) : (
          <button className="navItem" onClick={connectAccount}>
            connect to account (Rinkeby)
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
