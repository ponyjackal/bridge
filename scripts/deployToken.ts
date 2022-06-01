import { ethers } from "hardhat";

async function main() {
  const TokenForBridge = await ethers.getContractFactory("TokenForBridge");
  const tokenForBridge = await TokenForBridge.deploy(
    process.env.BRIDGE_ADDRESS as string
  );

  await tokenForBridge.deployed();

  console.log(`Bridge deployed to: ${tokenForBridge.address}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
