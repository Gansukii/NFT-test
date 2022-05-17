const hre = require("hardhat");

async function main() {
  const NarutoNFT = await hre.ethers.getContractFactory("NarutoNFT");
  const narutoNFT = await NarutoNFT.deploy();

  await narutoNFT.deployed();

  console.log("NarutoNFT deployed to:", narutoNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
