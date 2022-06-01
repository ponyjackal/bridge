import { expect } from "chai";

export default (): void => {
  it("BRIDGE-INCLUDE: IncorrectAction is expected to return", async function (): Promise<void> {
    await expect(
      this.instanceBridgeETH.includeToken(
        this.network.chainId,
        this.instanceETHToken.address
      )
    ).to.be.revertedWith(
      `IncorrectAction("${this.instanceETHToken.address}", true)`
    );
  });
  it("BRIDGE-INCLUDE: ZeroAddress is expected to return", async function (): Promise<void> {
    await expect(
      this.instanceBridgeETH.includeToken(
        this.network.chainId,
        this.zeroAddress
      )
    ).to.be.revertedWith("ZeroAddress()");
  });
  it("BRIDGE-INCLUDE: ZeroChainId is expected to return", async function (): Promise<void> {
    await expect(
      this.instanceBridgeETH.includeToken(0, this.instanceETHToken.address)
    ).to.be.revertedWith("ZeroChainId()");
  });
  it("BRIDGE-EXCLUDE: IncorrectAction is expected to return", async function (): Promise<void> {
    await this.instanceBridgeETH.excludeToken(
      this.network.chainId,
      this.instanceETHToken.address
    );
    await expect(
      this.instanceBridgeETH.excludeToken(
        this.network.chainId,
        this.instanceETHToken.address
      )
    ).to.be.revertedWith(
      `IncorrectAction("${this.instanceETHToken.address}", false)`
    );
  });
  it("BRIDGE-EXCLUDE: ZeroAddress is expected to return", async function (): Promise<void> {
    await expect(
      this.instanceBridgeETH.excludeToken(
        this.network.chainId,
        this.zeroAddress
      )
    ).to.be.revertedWith("ZeroAddress()");
  });
  it("BRIDGE-EXCLUDE: ZeroChainId is expected to return", async function (): Promise<void> {
    await expect(
      this.instanceBridgeETH.excludeToken(0, this.instanceETHToken.address)
    ).to.be.revertedWith("ZeroChainId()");
  });
};
