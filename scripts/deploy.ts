import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Voting contract...");

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  await voting.waitForDeployment();

  const votingAddress = await voting.getAddress();
  console.log("Voting contract deployed to:", votingAddress);

  // Save the contract address to a file for frontend use
  const fs = require("fs");
  const contractAddresses = {
    voting: votingAddress,
    deployedAt: new Date().toISOString(),
    network: (await ethers.provider.getNetwork()).name,
  };

  fs.writeFileSync(
    "./frontend/src/config/contractAddresses.json",
    JSON.stringify(contractAddresses, null, 2)
  );

  console.log("Contract addresses saved to frontend/src/config/contractAddresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
