import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import narutoNft from "../NarutoNFT.json";

const Mintables = ({ character, accounts, accountWalletMints }) => {
  const { metadataURI, image, name } = character;
  //   const [accountWalletMints, setAccountWalletMints] = useState([]);
  const narutoNFTAddress = "0x3cBa7C9A26d09E08f693a402C5398D9a89D2a662";
  const isConnected = Boolean(accounts[0]);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(narutoNFTAddress, narutoNft.abi, signer);

  //   useEffect(() => {
  //     setCharactersArr([characters]);
  //     async function getMints() {
  //       const walletMints = await contract.getWalletMints(accounts[0]);
  //       setAccountWalletMints(walletMints);
  //     }
  //     if (isConnected) {
  //       getMints();
  //     }
  //   }, [accounts]);

  async function handleMint() {
    if (accountWalletMints.includes(metadataURI)) return;

    if (window.ethereum) {
      try {
        const response = await contract.mint(metadataURI, {
          value: ethers.utils.parseEther((0.002).toString()),
        });
        console.log("response: ", response);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }
  return (
    <div>
      qwerqe
      <div>
        <b>{name}</b>
        <a href={metadataURI}>{metadataURI}</a>
      </div>
      <div>
        <button disabled={accountWalletMints.includes(metadataURI)} onClick={handleMint}>
          {accountWalletMints.includes(metadataURI) ? "Owned!" : "Mint!"}
        </button>
      </div>
    </div>
  );
};

export default Mintables;
