const hre = require("hardhat");

async function main() {

   const Dictionary = await hre.ethers.getContractFactory("Dictionary");
   const config = await Dictionary.deploy();

   await config.deployed();
   console.log("Dictionary deployed to:", config.address);

   await hre.run("verify:verify", {
      address: config.address
   });
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
