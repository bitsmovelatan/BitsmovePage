const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FertilityToken", function () {
  let fertilityToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const FertilityToken = await ethers.getContractFactory("FertilityToken");
    fertilityToken = await FertilityToken.deploy();
    await fertilityToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await fertilityToken.owner()).to.equal(owner.address);
    });

    it("Should assign the initial supply to owner", async function () {
      const ownerBalance = await fertilityToken.balanceOf(owner.address);
      expect(await fertilityToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should have correct name and symbol", async function () {
      expect(await fertilityToken.name()).to.equal("FertilityToken");
      expect(await fertilityToken.symbol()).to.equal("FERT");
    });
  });

  describe("Claiming", function () {
    it("Should allow users to claim tokens", async function () {
      await fertilityToken.connect(addr1).claimTokens();
      const claimAmount = await fertilityToken.CLAIM_AMOUNT();
      expect(await fertilityToken.balanceOf(addr1.address)).to.equal(claimAmount);
    });

    it("Should not allow claiming twice", async function () {
      await fertilityToken.connect(addr1).claimTokens();
      await expect(
        fertilityToken.connect(addr1).claimTokens()
      ).to.be.revertedWith("Tokens already claimed");
    });

    it("Should track claimed status", async function () {
      expect(await fertilityToken.hasClaimedTokens(addr1.address)).to.be.false;
      await fertilityToken.connect(addr1).claimTokens();
      expect(await fertilityToken.hasClaimedTokens(addr1.address)).to.be.true;
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint tokens", async function () {
      const mintAmount = ethers.parseEther("100");
      await fertilityToken.mint(addr1.address, mintAmount);
      expect(await fertilityToken.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("Should not allow non-owner to mint", async function () {
      const mintAmount = ethers.parseEther("100");
      await expect(
        fertilityToken.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.reverted;
    });
  });

  describe("Pause", function () {
    it("Should allow owner to pause", async function () {
      await fertilityToken.pause();
      expect(await fertilityToken.paused()).to.be.true;
    });

    it("Should prevent claims when paused", async function () {
      await fertilityToken.pause();
      await expect(
        fertilityToken.connect(addr1).claimTokens()
      ).to.be.revertedWithCustomError(fertilityToken, "EnforcedPause");
    });

    it("Should allow unpause", async function () {
      await fertilityToken.pause();
      await fertilityToken.unpause();
      expect(await fertilityToken.paused()).to.be.false;
    });
  });
});

