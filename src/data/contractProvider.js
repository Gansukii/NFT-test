import { ethers } from "ethers";
import narutoNft from "../NarutoNFT.json";

const narutoNFTAddress = "0xF2A60a4b0cb4ccC81e6D93452e5D1B262fCF6A07";

export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();
export const contract = new ethers.Contract(narutoNFTAddress, narutoNft.abi, signer);
