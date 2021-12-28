var config = require('../../config.env');
const hre = require("hardhat");

async function main() {

   const ERC1_1155 = await hre.ethers.getContractFactory("ERC1155Standard");
   const erc1_1155 = await ERC1_1155.deploy(config.erc1155.name, config.erc1155.symbol, config.erc1155.address, config.erc1155.amount, config.erc1155.metadata);
   await erc1_1155.deployed();
   console.log("ERC1155Standard deployed to:", erc1_1155.address);

   const ERC2_1155 = await hre.ethers.getContractFactory("ERC1155Burn");
   const erc2_1155 = await ERC2_1155.deploy(config.erc1155.name, config.erc1155.symbol, config.erc1155.address, config.erc1155.amount, config.erc1155.metadata);
   await erc2_1155.deployed();
   console.log("ERC1155Burn deployed to:", erc2_1155.address);

   await hre.run("verify:verify", {
      address: erc1_1155.address,
      contract: "contracts/token/ERC1155/ERC1155Standard.sol:ERC1155Standard",
      constructorArguments: [config.erc1155.name, config.erc1155.symbol, config.erc1155.address, config.erc1155.amount, config.erc1155.metadata]
   });

   await hre.run("verify:verify", {
      address: erc2_1155.address,
      contract: "contracts/token/ERC1155/ERC1155Burn.sol:ERC1155Burn",
      constructorArguments: [config.erc1155.name, config.erc1155.symbol, config.erc1155.address, config.erc1155.amount, config.erc1155.metadata]
   });

}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
