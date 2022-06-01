import { ethers } from "hardhat";
import { expect } from "chai";

export default (): void => {
  it("BRIDGE-SWAP: The balance is expected to be zero after the swap", async function (): Promise<void> {
    await this.instanceBridgeETH
      .connect(this.acc)
      .swap(
        this.instanceETHToken.address,
        this.instanceBSCToken.address,
        this.testAmount,
        this.chainIdBSC
      );

    const balance = await this.instanceETHToken.balanceOf(this.acc.address);

    expect(balance).to.eq(0);
  });
  it("BRIDGE-SWAP: ZeroAddress is expected to return", async function (): Promise<void> {
    await expect(
      this.instanceBridgeETH
        .connect(this.acc)
        .swap(
          this.zeroAddress,
          this.instanceBSCToken.address,
          this.testAmount,
          this.chainIdBSC
        )
    ).to.be.revertedWith("ZeroAddress()");
  });
  it("BRIDGE-SWAP: ZeroAddress is expected to return", async function (): Promise<void> {
    await expect(
      this.instanceBridgeETH
        .connect(this.acc)
        .swap(
          this.instanceETHToken.address,
          this.zeroAddress,
          this.testAmount,
          this.chainIdBSC
        )
    ).to.be.revertedWith("ZeroAddress()");
  });
  it("BRIDGE-SWAP: IncorrectAction is expected to return", async function (): Promise<void> {
    await expect(
      this.instanceBridgeETH
        .connect(this.acc)
        .swap(
          this.ownerETH.address,
          this.instanceBSCToken.address,
          this.testAmount,
          this.chainIdBSC
        )
    ).to.be.revertedWith(`IncorrectAction("${this.ownerETH.address}", false)`);
  });
  it("BRIDGE-SWAP: IncorrectAction is expected to return", async function (): Promise<void> {
    await expect(
      this.instanceBridgeETH
        .connect(this.acc)
        .swap(
          this.instanceETHToken.address,
          this.ownerETH.address,
          this.testAmount,
          this.chainIdBSC
        )
    ).to.be.revertedWith(`IncorrectAction("${this.ownerETH.address}", false)`);
  });
  it("BRIDGE-REEDEM: After reedem the balance is expected to be 2e9", async function (): Promise<void> {
    const swap = await this.instanceBridgeETH
      .connect(this.acc)
      .swap(
        this.instanceETHToken.address,
        this.instanceBSCToken.address,
        this.testAmount,
        this.chainIdBSC
      );
    const { events } = await swap.wait();
    const event = events.find((it: any) => it.event === "Swap").args;
    const [_tokenTo, _to, _amount, _nonce] = event;
    const hash = await ethers.utils.solidityKeccak256(
      ["address", "address", "uint256", "uint256"],
      [_tokenTo, _to, +_amount, +_nonce]
    );
    const signature = await this.ownerBridgeBSC.signMessage(
      ethers.utils.arrayify(hash)
    );

    await this.instanceBridgeBSC.reedem(
      _tokenTo,
      _to,
      _amount,
      _nonce,
      signature
    );

    const balance = await this.instanceBSCToken.balanceOf(this.acc.address);

    expect(balance).to.eq(2e9);
  });
  it("BRIDGE-REEDEM: IncorrectSignature is expected to return", async function (): Promise<void> {
    const swap = await this.instanceBridgeETH
      .connect(this.acc)
      .swap(
        this.instanceETHToken.address,
        this.instanceBSCToken.address,
        this.testAmount,
        this.chainIdBSC
      );
    const { events } = await swap.wait();
    const event = events.find((it: any) => it.event === "Swap").args;
    const [_tokenTo, _to, _amount, _nonce] = event;
    const hash = await ethers.utils.solidityKeccak256(
      ["address", "address", "uint256", "uint256"],
      [_tokenTo, _to, +_amount, +_nonce]
    );
    const signature = await this.ownerBridgeBSC.signMessage(
      ethers.utils.arrayify(hash)
    );

    await expect(
      this.instanceBridgeBSC.reedem(_tokenTo, _to, _amount, 0, signature)
    ).to.be.revertedWith("IncorrectSignature()");
  });
};
