const hre = require("hardhat");

async function main() {
  console.log("Deploying HahToken contract...");

  // Get the contract factory
  const HahToken = await hre.ethers.getContractFactory("HahToken");
  
  // Deploy the contract
  const hahToken = await HahToken.deploy();
  
  await hahToken.waitForDeployment();
  
  const address = await hahToken.getAddress();
  
  console.log(`✓ HahToken deployed to: ${address}`);
  console.log(`  Network: ${hre.network.name}`);
  console.log(`  Deployer: ${(await hre.ethers.getSigners())[0].address}`);
  
  // Get token details
  const name = await hahToken.name();
  const symbol = await hahToken.symbol();
  const totalSupply = await hahToken.totalSupply();
  
  console.log(`\nToken Details:`);
  console.log(`  Name: ${name}`);
  console.log(`  Symbol: ${symbol}`);
  console.log(`  Total Supply: ${hre.ethers.formatEther(totalSupply)} ${symbol}`);
  
  // Wait for block confirmations before verification
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\nWaiting for block confirmations...");
    await hahToken.deploymentTransaction().wait(6);
    
    console.log("\nVerifying contract on Polygonscan...");
    try {
      await hre.run("verify:verify", {

          
        address: address,
        constructorArguments: [],
      });
      console.log("✓ Contract verified successfully");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
  
  console.log("\n📝 Save this contract address to your .env file:");
  console.log(`CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

