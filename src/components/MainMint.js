import React, { useState, useEffect } from "react";

import { contract } from "../data/contractProvider";
import characters from "../data/characters.json";
import Mintables from "../components/Mintables";

const MainMint = ({ accounts, setAccounts }) => {
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
    <div>
      <div>Sample NFT</div>
      {isConnected ? (
        characters.map((character) => (
          <div key={character.image}>
            <Mintables character={character} accounts={accounts} accountWalletMints={accountWalletMints} />
          </div>
        ))
      ) : (
        <div>You need to log in first.</div>
      )}
    </div>
  );
};

export default MainMint;
