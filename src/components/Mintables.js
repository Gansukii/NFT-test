import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import narutoNft from "../NarutoNFT.json";
import { contract } from "../data/contractProvider";

const Mintables = ({ character, accountWalletMints }) => {
  const { metadataURI, image, name } = character;
  const [isProcessing, setIsProcessing] = useState(false);
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
