import React, { useState, useEffect, useContext } from "react";

import { contract } from "../data/contractProvider";
import characters from "../data/characters.json";
import Mintables from "../components/Mintables";
import UserContext from "../data/userContext";

// const MainMint = ({ accounts, setAccounts }) => {
const MainMint = () => {
  const { accounts, setAccounts } = useContext(UserContext);
  const [accountWalletMints, setAccountWalletMints] = useState([]);
  const isConnected = Boolean(accounts[0]);

  useEffect(() => {
    // setCharactersArr([characters]);
    async function getMints() {
      const walletMints = await contract.getWalletMints(accounts[0]);
      setAccountWalletMints(walletMints);
    }
    if (isConnected) {
      getMints();
    }
  }, [accounts]);

  return (
    <div className="main">
      <div className="txtMain">Start minting Naruto NFT!</div>

      <div className="mintMain">
        {isConnected ? (
          characters.map((character) => (
            <Mintables key={character.image} character={character} accounts={accounts} accountWalletMints={accountWalletMints} />
          ))
        ) : (
          <div>You need to log in first.</div>
        )}
      </div>
    </div>
  );
};

export default MainMint;
