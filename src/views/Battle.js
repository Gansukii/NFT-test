import { useEffect, useContext, useState } from "react";
import UserContext from "../data/userContext";
import { contract } from "../data/contractProvider";
import axios from "axios";
import BattleCard from "../components/BattleCard";

const Battle = () => {
  const { accounts, setAccounts } = useContext(UserContext);
  const [walletNFTs, setWalletNFTs] = useState([]);
  const [bossData, setBossData] = useState({});

  useEffect(() => {
    const storageAccount = localStorage.getItem("currentAccount") || "";
    if (storageAccount) {
      setAccounts([storageAccount]);
    }

    async function getBoss() {
      const bossURI = await contract.getBossURI();
      const bossData = await axios(`https://ipfs.io/ipfs/${bossURI}`);
      const bossHP = await contract.bossHP();
      bossData.data.bossHP = parseInt(bossHP._hex, 16);
      setBossData(bossData.data);
    }
    async function getMints() {
      const walletMints = await contract.getWalletMints(accounts[0]);
      const nfts = [];
      for (let uri of walletMints) {
        const response = await axios(uri);
        nfts.push(response.data);
      }
      setWalletNFTs(nfts);
    }
    if (accounts[0]) {
      getBoss();
      getMints();
    }
  }, [accounts[0]]);

  // useEffect(() => {
  //   console.log(walletNFTs);
  // }, [walletNFTs]);

  return (
    <div>
      {walletNFTs.length > 0 ? (
        walletNFTs.map((item) => <BattleCard key={item.image} character={item} />)
      ) : (
        <div> You have no existing NFT. Mint first before proceeding to battle!</div>
      )}

      {Object.keys(bossData).length > 0 && (
        <div>
          {bossData.name}|{bossData.bossHP} |{bossData.attack}
        </div>
      )}
    </div>
  );
};

export default Battle;
