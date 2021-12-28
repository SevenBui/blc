
var config = require('../../config.env');
const hre = require("hardhat");

async function main() {

   const ERC1_20 = await hre.ethers.getContractFactory("ERC20Standard");
   const erc1_20 = await ERC1_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply);
   await erc1_20.deployed();
   console.log("ERC20Standard deployed to:", erc1_20.address);


   // const ERC2_20 = await hre.ethers.getContractFactory("ERC20Mint");
   // const erc2_20 = await ERC2_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap);
   // await erc2_20.deployed();
   // console.log("ERC20Mint deployed to:", erc2_20.address);

   // const ERC3_20 = await hre.ethers.getContractFactory("ERC20Burn");
   // const erc3_20 = await ERC3_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply);
   // await erc3_20.deployed();
   // console.log("ERC20Burn deployed to:", erc3_20.address);

   // const ERC4_20 = await hre.ethers.getContractFactory("ERC20Pause");
   // const erc4_20 = await ERC4_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply);
   // await erc4_20.deployed();
   // console.log("ERC20Pause deployed to:", erc4_20.address);

   // const ERC5_20 = await hre.ethers.getContractFactory("ERC20Governance");
   // const erc5_20 = await ERC5_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply);
   // await erc5_20.deployed();
   // console.log("ERC20Governance deployed to:", erc5_20.address);


   // const ERC6_20 = await hre.ethers.getContractFactory("ERC20MintBurn");
   // const erc6_20 = await ERC6_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap);
   // await erc6_20.deployed();
   // console.log("ERC20MintBurn deployed to:", erc6_20.address);

   // const ERC7_20 = await hre.ethers.getContractFactory("ERC20MintPause");
   // const erc7_20 = await ERC7_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap);
   // await erc7_20.deployed();
   // console.log("ERC20MintPause deployed to:", erc7_20.address);

   // const ERC8_20 = await hre.ethers.getContractFactory("ERC20MintGovernance");
   // const erc8_20 = await ERC8_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap);
   // await erc8_20.deployed();
   // console.log("ERC20MintGovernance deployed to:", erc8_20.address);

   // const ERC9_20 = await hre.ethers.getContractFactory("ERC20BurnPause");
   // const erc9_20 = await ERC9_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply);
   // await erc9_20.deployed();
   // console.log("ERC20BurnPause deployed to:", erc9_20.address);

   // const ERC10_20 = await hre.ethers.getContractFactory("ERC20BurnGovernance");
   // const erc10_20 = await ERC10_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply);
   // await erc10_20.deployed();
   // console.log("ERC20BurnGovernance deployed to:", erc8_20.address);

   // const ERC11_20 = await hre.ethers.getContractFactory("ERC20PauseGovernance");
   // const erc11_20 = await ERC11_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply);
   // await erc11_20.deployed();
   // console.log("ERC20PauseGovernance deployed to:", erc11_20.address);

   // const ERC12_20 = await hre.ethers.getContractFactory("ERC20MintBurnPause");
   // const erc12_20 = await ERC12_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap);
   // await erc12_20.deployed();
   // console.log("ERC20MintBurnPause deployed to:", erc12_20.address);

   // const ERC13_20 = await hre.ethers.getContractFactory("ERC20MintBurnGovernance");
   // const erc13_20 = await ERC13_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap);
   // await erc13_20.deployed();
   // console.log("ERC20MintBurnGovernance deployed to:", erc13_20.address);

   // const ERC14_20 = await hre.ethers.getContractFactory("ERC20MintPauseGovernance");
   // const erc14_20 = await ERC14_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap);
   // await erc14_20.deployed();
   // console.log("ERC20MintPauseGovernance deployed to:", erc14_20.address);

   // const ERC15_20 = await hre.ethers.getContractFactory("ERC20BurnPauseGovernance");
   // const erc15_20 = await ERC15_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply);
   // await erc15_20.deployed();
   // console.log("ERC20BurnPauseGovernance deployed to:", erc15_20.address);

   // const ERC16_20 = await hre.ethers.getContractFactory("ERC20MintBurnPauseGovernance");
   // const erc16_20 = await ERC16_20.deploy(config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap);
   // await erc16_20.deployed();
   // console.log("ERC20MintBurnPauseGovernance deployed to:", erc16_20.address);

   // await hre.run("verify:verify", {
   //    address: erc1_20.address,
   //    contract: "contracts/token/ERC20/ERC20Standard.sol:ERC20Standard",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply]
   // });

   // await hre.run("verify:verify", {
   //    address: erc2_20.address,
   //    contract: "contracts/token/ERC20/ERC20Mint.sol:ERC20Mint",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap]
   // });

   // await hre.run("verify:verify", {
   //    address: erc3_20.address,
   //    contract: "contracts/token/ERC20/ERC20Burn.sol:ERC20Burn",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply]
   // });

   // await hre.run("verify:verify", {
   //    address: erc4_20.address,
   //    contract: "contracts/token/ERC20/ERC20Pause.sol:ERC20Pause",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply]
   // });


   // await hre.run("verify:verify", {
   //    address: erc5_20.address,
   //    contract: "contracts/token/ERC20/ERC20Governance.sol:ERC20Governance",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply]
   // });


   // await hre.run("verify:verify", {
   //    address: erc6_20.address,
   //    contract: "contracts/token/ERC20/ERC20MintBurn.sol:ERC20MintBurn",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap]
   // });

   // await hre.run("verify:verify", {
   //    address: erc7_20.address,
   //    contract: "contracts/token/ERC20/ERC20MintPause.sol:ERC20MintPause",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap]
   // });

   // await hre.run("verify:verify", {
   //    address: erc8_20.address,
   //    contract: "contracts/token/ERC20/ERC20MintGovernance.sol:ERC20MintGovernance",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap]
   // });

   // await hre.run("verify:verify", {
   //    address: erc9_20.address,
   //    contract: "contracts/token/ERC20/ERC20BurnPause.sol:ERC20BurnPause",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply]
   // });

   // await hre.run("verify:verify", {
   //    address: erc10_20.address,
   //    contract: "contracts/token/ERC20/ERC20BurnGovernance.sol:ERC20BurnGovernance",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply]
   // });

   // await hre.run("verify:verify", {
   //    address: erc11_20.address,
   //    contract: "contracts/token/ERC20/ERC20PauseGovernance.sol:ERC20PauseGovernance",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply]
   // });

   // await hre.run("verify:verify", {
   //    address: erc12_20.address,
   //    contract: "contracts/token/ERC20/ERC20MintBurnPause.sol:ERC20MintBurnPause",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap]
   // });

   // await hre.run("verify:verify", {
   //    address: "0x910D58b2ce3cB7a1326f8F1bBB7fda245bFb164a",
   //    contract: "contracts/token/ERC20/ERC20MintBurnGovernance.sol:ERC20MintBurnGovernance",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap]
   // });

   // await hre.run("verify:verify", {
   //    address: erc14_20.address,
   //    contract: "contracts/token/ERC20/ERC20MintPauseGovernance.sol:ERC20MintPauseGovernance",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap]
   // });

   // await hre.run("verify:verify", {
   //    address: erc15_20.address,
   //    contract: "contracts/token/ERC20/ERC20BurnPauseGovernance.sol:ERC20BurnPauseGovernance",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply]
   // });

   // await hre.run("verify:verify", {
   //    address: erc16_20.address,
   //    contract: "contracts/token/ERC20/ERC20MintBurnPauseGovernance.sol:ERC20MintBurnPauseGovernance",
   //    constructorArguments: [config.erc20.address, config.erc20.name, config.erc20.symbol, config.erc20.decimal, config.erc20.totalSupply, config.erc20.cap]
   // });



}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
