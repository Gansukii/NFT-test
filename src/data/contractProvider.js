import { ethers } from "ethers";
import narutoNft from "../NarutoNFT.json";

const narutoNFTAddress = "0x3cBa7C9A26d09E08f693a402C5398D9a89D2a662";

export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();
export const contract = new ethers.Contract(narutoNFTAddress, narutoNft.abi, signer);
