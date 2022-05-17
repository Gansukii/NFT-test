import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import narutoNft from "./NarutoNFT.json";
import characters from "./data/characters.json";
import Mintables from "./components/Mintables";

// const sampleNFTAddress = "0x7aBaEA959935263aBc54A34A593dFb1F8944C470";
// const sampleNFTAddress = "0x96e2503621DaFf4e3D24C3f5D35126978536bbB8";
// const narutoNFTAddress = "0x543c638dbc8ED7A6dD2D1279F43ce9dcefb2D734";
// const narutoNFTAddress = "0xf8C010C804c79660Ed8dE26e973067ACB7648De0";
// const narutoNFTAddress = "0x4Cb50d195a4baBc255c8c9b51888D07E7e5D958F";
const narutoNFTAddress = "0x3cBa7C9A26d09E08f693a402C5398D9a89D2a662";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [charactersArr, setCharactersArr] = useState([]);
  const [accountWalletMints, setAccountWalletMints] = useState([]);
  const isConnected = Boolean(accounts[0]);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(narutoNFTAddress, narutoNft.abi, signer);

  useEffect(() => {
    setCharactersArr([characters]);
    async function getMints() {
      const walletMints = await contract.getWalletMints(accounts[0]);
      setAccountWalletMints(walletMints);
    }
    if (isConnected) {
      getMints();
    }
  }, [accounts]);

  // async function handleMint(tokenURI) {
  //   if (accountWalletMints.includes(tokenURI)) return;

  //   if (window.ethereum) {
  //     try {
  //       const response = await contract.mint(tokenURI, {
  //         value: ethers.utils.parseEther((0.002).toString()),
  //       });
  //       console.log("response: ", response);
  //     } catch (err) {
  //       console.log("error: ", err);
  //     }
  //   }
  // }

  return (
    <div>
      <div>Sample NFT</div>
      {isConnected ? (
        characters.map((character) => (
          <div key={character.image}>
            <Mintables character={character} accounts={accounts} accountWalletMints={accountWalletMints} />
            {/* <div>
              <b>{character.name}</b>
              <a href={character.metadataURI}>{character.metadataURI}</a>
            </div>
            <div>
              <button
                disabled={accountWalletMints.includes(character.metadataURI)}
                onClick={() => handleMint(character.metadataURI)}
              >
                {accountWalletMints.includes(character.metadataURI) ? "Owned!" : "Mint!"}
              </button>
            </div> */}
          </div>
        ))
      ) : (
        <div>You need to log in first.</div>
      )}
    </div>
  );
};

export default MainMint;

// (
//   <div>
//     <button onClick={handleMint}>Mint!</button>
//   </div>
// )
