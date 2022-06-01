import { artifacts, ethers, waffle } from "hardhat";
import { Artifact } from "hardhat/types";
import includeExclude from "./includeExclude";
import swapReedem from "./swapReedem";

export default describe("Contract bridge testing", async function () {
  before(async function () {
    this.network = await ethers.provider.getNetwork();
    this.chainIdBSC = 97;
    this.testAmount = 1e9;
    this.zeroAddress = "0x0000000000000000000000000000000000000000";
    [
      this.ownerETH,
      this.ownerBSC,
      this.ownerBridgeETH,
      this.ownerBridgeBSC,
      this.acc,
    ] = await ethers.getSigners();
  });
  beforeEach(async function () {
    this.nonce = 0;

    const artifactBridgeETH: Artifact = await artifacts.readArtifact("Bridge");

    this.instanceBridgeETH = await waffle.deployContract(
      this.ownerBridgeETH,
      artifactBridgeETH
    );

    const artifactETHtoken: Artifact = await artifacts.readArtifact(
      "TokenForBridge"
    );

    this.instanceETHToken = await waffle.deployContract(
      this.ownerETH,
      artifactETHtoken,
      [this.instanceBridgeETH.address]
    );
    this.nonce = 0;

    const artifactBridgeBSC: Artifact = await artifacts.readArtifact("Bridge");

    this.instanceBridgeBSC = await waffle.deployContract(
      this.ownerBridgeBSC,
      artifactBridgeBSC
    );

    const artifactBSCtoken: Artifact = await artifacts.readArtifact(
      "TokenForBridge"
    );

    this.instanceBSCToken = await waffle.deployContract(
      this.ownerBSC,
      artifactBSCtoken,
      [this.instanceBridgeBSC.address]
    );

    await this.instanceBSCToken.mint(this.acc.address, this.testAmount);
    await this.instanceETHToken.mint(this.acc.address, this.testAmount);
    await this.instanceBridgeETH.includeToken(
      this.chainIdBSC,
      this.instanceBSCToken.address
    );
    await this.instanceBridgeETH.includeToken(
      this.network.chainId,
      this.instanceETHToken.address
    );
    await this.instanceBridgeBSC.includeToken(
      this.network.chainId,
      this.instanceETHToken.address
    );
    await this.instanceBridgeBSC.includeToken(
      this.chainIdBSC,
      this.instanceBSCToken.address
    );
  });
  swapReedem();
  includeExclude();
});
