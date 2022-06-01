import { task } from "hardhat/config";

task("swap", "Swap tokens to another network")
  .addParam("tokenFrom", "Token in the current network ")
  .addParam("tokenTo", "Token on another network ")
  .addParam("amount", "Amount of tokens")
  .addParam("chain", "ID the chain you want to transfer to")
  .setAction(async ({ tokenFrom, tokenTo, amount, chain }, { ethers }) => {
    const [signer] = await ethers.getSigners();
    const instance = await ethers.getContractAt(
      "Bridge",
      process.env.BRIDGE_ADDRESS_ETH as string,
      signer
    );

    await instance.swap(tokenFrom, tokenTo, amount, chain);

    console.log("Swap was a success");
  });

task("reedem", "Redemption of tokens in other networks")
  .addParam("tokenTo", "Token in the current network")
  .addParam("to", "Wallet address")
  .addParam("amount", "Amount of tokens")
  .addParam("nonce", "Nonce number")
  .setAction(async ({ tokenTo, to, amount, nonce }, { ethers }) => {
    const [signer] = await ethers.getSigners();
    const instance = await ethers.getContractAt(
      "Bridge",
      process.env.BRIDGE_ADDRESS_BSC as string,
      signer
    );
    const hash = await ethers.utils.solidityKeccak256(
      ["address", "address", "uint256", "uint256"],
      [tokenTo, to, amount, nonce]
    );
    const signature = await signer.signMessage(ethers.utils.arrayify(hash));

    await instance.reedem(tokenTo, to, amount, nonce, signature);

    console.log("Reedem was a success");
  });
