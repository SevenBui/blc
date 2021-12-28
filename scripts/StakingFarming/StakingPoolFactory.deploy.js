const hre = require("hardhat");
const config = require("../config.env");

async function main() {
   const SCPoolFactory = await hre.ethers.getContractFactory("StakingPoolFactory");
   const PoolFactory = await SCPoolFactory.deploy(config.dic.eth);

   await PoolFactory.deployed();

   console.log("PoolFactory deployed to:", PoolFactory.address);

   await hre.run("verify:verify", {
      address: PoolFactory.address,
      constructorArguments: [config.dic.eth]
   });
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
