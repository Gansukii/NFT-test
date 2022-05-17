import { Link } from "react-router-dom";

const Navbar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

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
        <Link to="./Battle">Battle</Link>
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
