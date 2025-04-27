require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const QBitcoin = await ethers.getContractFactory("QBitcoin");
  const qbitcoin = await QBitcoin.deploy();

  await qbitcoin.deployed();

  console.log("QBitcoin deployed to:", qbitcoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
