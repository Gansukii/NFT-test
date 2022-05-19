import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import narutoNft from "../NarutoNFT.json";

const Mintables = ({ character, accounts, accountWalletMints }) => {
  const { metadataURI, image, name } = character;
  const [isProcessing, setIsProcessing] = useState(false);
  const narutoNFTAddress = "0x3cBa7C9A26d09E08f693a402C5398D9a89D2a662";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(narutoNFTAddress, narutoNft.abi, signer);
  let isOwned = accountWalletMints.includes(metadataURI);

  async function handleMint() {
    if (accountWalletMints.includes(metadataURI)) return;
    if (window.ethereum) {
      try {
        setIsProcessing(true);
        const response = await contract.mint(metadataURI, {
          value: ethers.utils.parseEther((0.002).toString()),
        });
        console.log("response: ", response);
        setIsProcessing(false);
        isOwned = true;
      } catch (err) {
        setIsProcessing(false);
        console.log("error: ", err);
      }
    }
  }
  return (
    <div>
      <div>
        <b>{name}</b>
        <a href={metadataURI}>{metadataURI}</a>
      </div>
      <div>
        <button disabled={isProcessing} onClick={handleMint}>
          {isOwned ? "Owned!" : "Mint!"}
        </button>
      </div>
    </div>
  );
};

export default Mintables;
