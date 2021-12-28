
var config = require('../../config.env');
const hre = require("hardhat");

async function main() {

   const ERC1_777 = await hre.ethers.getContractFactory("ERC777Standard");
   const erc1_777 = await ERC1_777.deploy(config.erc777.name, config.erc777.symbol, config.erc777.decimal, config.erc777.totalSupply, config.erc777.address);
   await erc1_777.deployed();
   console.log("ERC777Standard deployed to:", erc1_777.address);

   const ERC2_777 = await hre.ethers.getContractFactory("ERC777Mint");
   const erc2_777 = await ERC2_777.deploy(config.erc777.name, config.erc777.symbol, config.erc777.decimal, config.erc777.totalSupply, config.erc777.cap, config.erc777.address);
   await erc2_777.deployed();
   console.log("ERC777Mint deployed to:", erc2_777.address);

   const ERC3_777 = await hre.ethers.getContractFactory("ERC777Governance");
   const erc3_777 = await ERC3_777.deploy(config.erc777.name, config.erc777.symbol, config.erc777.decimal, config.erc777.totalSupply, config.erc777.address);
   await erc3_777.deployed();
   console.log("ERC777Governance deployed to:", erc3_777.address);

   const ERC4_777 = await hre.ethers.getContractFactory("ERC777MintGovernance");
   const erc4_777 = await ERC4_777.deploy(config.erc777.name, config.erc777.symbol, config.erc777.decimal, config.erc777.totalSupply, config.erc777.cap, config.erc777.address);
   await erc4_777.deployed();
   console.log("ERC777MintGovernance deployed to:", erc4_777.address);


   await hre.run("verify:verify", {
      address: erc1_777.address,
      contract: "contracts/token/ERC777/ERC777Standard.sol:ERC777Standard",
      constructorArguments: [config.erc777.name, config.erc777.symbol, config.erc777.decimal, config.erc777.totalSupply, config.erc777.address]
   });

   await hre.run("verify:verify", {
      address: erc2_777.address,
      contract: "contracts/token/ERC777/ERC777Mint.sol:ERC777Mint",
      constructorArguments: [config.erc777.name, config.erc777.symbol, config.erc777.decimal, config.erc777.totalSupply, config.erc777.cap, config.erc777.address]
   });

   await hre.run("verify:verify", {
      address: erc3_777.address,
      contract: "contracts/token/ERC777/ERC777Governance.sol:ERC777Governance",
      constructorArguments: [config.erc777.name, config.erc777.symbol, config.erc777.decimal, config.erc777.totalSupply, config.erc777.address]
   });

   await hre.run("verify:verify", {
      address: erc4_777.address,
      contract: "contracts/token/ERC777/ERC777MintGovernance.sol:ERC777MintGovernance",
      constructorArguments: [config.erc777.name, config.erc777.symbol, config.erc777.decimal, config.erc777.totalSupply, config.erc777.cap, config.erc777.address]
   });


}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
