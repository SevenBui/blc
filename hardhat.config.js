require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require('@openzeppelin/upgrades-core');
require('hardhat-contract-sizer');
require("dotenv").config();


const INFURA = process.env.INFURA_KEY;
const ACCOUNT = process.env.ACCOUNT;
var API_KEY = "";
const ID = process.env.ID;

if (ID == "ETH") {
  API_KEY = process.env.API_KEY_ETH;
} else if (ID == "BSC") {
  API_KEY = process.env.API_KEY_BSC;
} else {
  console.log("NETWORK is comming soon")
}

module.exports = {
  solidity: {
    version: '0.8.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      },
    },

  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: false,
  },

  networks: {
    hardhat: {
      gas: 'auto',
      allowUnlimitedContractSize: true,
    },
    creator_v1: {
      url: "https://dev.rpc.magnet.creatorchain.network",
      chainId: 1509,
      gasPrice: 9000000000,
      accounts: [ACCOUNT],
    },
    creator_v2: {
      url: "https://rpc.magnet.creatorchain.network",
      chainId: 1509,
      gasPrice: 9000000000,
      accounts: [ACCOUNT],
    },
    // testnet
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA}`,
      accounts: [ACCOUNT],
      gas: 5500000,
      gasPrice: 9000000000,
      blockGasLimit: 15000000,
      timeout: 20000,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA}`,
      accounts: [ACCOUNT],
      gas: 550000000,
      gasPrice: 90000000000,
      blockGasLimit: 15000000,
      timeout: 200000,
    },
    bsc_testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [ACCOUNT],
    },

    //mainnet
    ethereum: {
      url: `https://mainnet.infura.io/v3/${INFURA}`,
      accounts: [ACCOUNT],
      timeout: 20000,
    },
    binance: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [ACCOUNT],
    },
  },
  etherscan: {
    apiKey: API_KEY,
  }
};

