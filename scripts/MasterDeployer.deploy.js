const { ethers, upgrades } = require("hardhat");
var configDeploy = require('../config/config.dictionary');

async function main() {

   //deploy
   const SC_master = await ethers.getContractFactory("MasterDeployer");
   const master = await upgrades.deployProxy(SC_master, [configDeploy.dic.bnb]);
   await master.deployed();
   console.log("Proxy deployed to:", master.address);
   const implAddress = await upgrades.erc1967.getImplementationAddress(master.address);
   console.log("SC-master MasterERC20 deployed to:", implAddress);

   //upgrading
   // const SC_upgarde_master = await ethers.getContractFactory("MasterDeployer");
   // const master_upgrade = await upgrades.upgradeProxy(master.address, SC_upgarde_master);

   // verify
   console.log("==========> Start verify");
   await hre.run("verify:verify", {
      address: implAddress
   });

}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });


module.exports = {};