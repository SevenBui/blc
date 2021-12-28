
var config = require('../../config.env');
const hre = require("hardhat");

async function main() {

   const ERC1_721 = await hre.ethers.getContractFactory("ERC721Standard");
   const erc1_721 = await ERC1_721.deploy(config.erc721.name, config.erc721.symbol, config.erc721.address, config.erc721.metadata);
   await erc1_721.deployed();
   console.log("ERC721Standard deployed to:", erc1_721.address);

   const ERC2_721 = await hre.ethers.getContractFactory("ERC721Burn");
   const erc2_721 = await ERC2_721.deploy(config.erc721.name, config.erc721.symbol, config.erc721.address, config.erc721.metadata);
   await erc2_721.deployed();
   console.log("ERC721Burn deployed to:", erc2_721.address);

   await hre.run("verify:verify", {
      address: erc1_721.address,
      contract: "contracts/token/ERC721/ERC721Standard.sol:ERC721Standard",
      constructorArguments: [config.erc721.name, config.erc721.symbol, config.erc721.address, config.erc721.metadata]
   });

   await hre.run("verify:verify", {
      address: erc2_721.address,
      contract: "contracts/token/ERC721/ERC721Burn.sol:ERC721Burn",
      constructorArguments: [config.erc721.name, config.erc721.symbol, config.erc721.address, config.erc721.metadata]
   });

}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
