import { useEffect, useContext, useState } from "react";
import UserContext from "../data/userContext";
import { contract } from "../data/contractProvider";
import axios from "axios";
import BattleCard from "../components/BattleCard";
import { Navbar } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandFist, faHeart, faSwords } from "@fortawesome/free-solid-svg-icons";
import sword from "./sword.png";

const Battle = () => {
  const { accounts, setAccounts } = useContext(UserContext);
  const [walletNFTs, setWalletNFTs] = useState([]);
  const [bossData, setBossData] = useState({});
  const [bossHP, setBossHP] = useState();

  useEffect(() => {
    const storageAccount = localStorage.getItem("currentAccount") || "";
    if (storageAccount) {
      setAccounts([storageAccount]);
    }

    async function getBoss() {
      const bossURI = await contract.getBossURI();
      const bossData = await axios(`https://ipfs.io/ipfs/${bossURI}`);
      const currentBossHP = await contract.bossHP();
      setBossHP(parseInt(currentBossHP._hex, 16));
      // bossData.data.bossHP = parseInt(currentBossHP._hex, 16);
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

  useEffect(() => {
    console.log(bossData);
  }, [bossData]);

  return (
    <>
      <Navbar active="battle" />
      <div className="mainBattle">
        <div className="txtMain">Attack the boss!</div>

        <div className="battlePaper">
          {walletNFTs.length > 0 ? (
            walletNFTs.map((item) => <BattleCard key={item.image} character={item} setBossHP={setBossHP} />)
          ) : (
            <div className="noNftText"> You have no existing NFT. Mint first before proceeding to battle!</div>
          )}

          <div className="swordContainer">
            <img className="swordImg" src={sword} alt="sword image"></img>
          </div>

          {Object.keys(bossData).length > 0 ? (
            <div className="bossCard">
              <div className="battleName">{bossData.name}</div>
              <div>
                <img src={bossData.image} className="mintableImage"></img>
              </div>
              <div className="mintData bossData">
                <FontAwesomeIcon icon={faHandFist} /> {bossData.attack}
              </div>
              <div className="mintData">
                <FontAwesomeIcon icon={faHeart} /> {bossHP}
              </div>
            </div>
          ) : (
            <div className="noNftText">No current Boss</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Battle;
