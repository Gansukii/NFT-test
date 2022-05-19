import { useEffect, useContext, useState } from "react";
import UserContext from "../data/userContext";
import { contract } from "../data/contractProvider";
import axios from "axios";

const Battle = () => {
  const { accounts, setAccounts } = useContext(UserContext);
  const [walletNFTs, setWalletNFTs] = useState([]);

  useEffect(() => {
    const storageAccount = localStorage.getItem("currentAccount") || "";
    if (storageAccount) {
      setAccounts([storageAccount]);
    }
    async function getMints() {
      const walletMints = await contract.getWalletMints(accounts[0]);
      console.log(walletMints);
      const nfts = [];
      for (let uri of walletMints) {
        console.log(uri);
        const response = await axios(uri);
        nfts.push(response.data);
      }
      setWalletNFTs(nfts);
    }
    if (accounts[0]) {
      getMints();
    }
  }, [accounts[0]]);

  useEffect(() => {
    console.log(walletNFTs);
  }, [walletNFTs]);

  return (
    <div>
      {walletNFTs.length > 0 ? (
        walletNFTs.map((item) => (
          <div key={item.image}>
            <div>{item.name} | ngii</div>
            <div>{item.description}</div>
          </div>
        ))
      ) : (
        <div> You have no existing NFT. Mint first before proceeding to battle!</div>
      )}
    </div>
  );
};

export default Battle;
