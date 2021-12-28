# Master smart contract for  ERC20,  ERC721,  ERC777, ERC1155

## Local Development

The following assumes the use of `node@>=10`.

## Enviroment

Version: 1.0.0  

solidity: 0.8.0  

hardhat: ^2.7.0

hardhat-ethers: ^2.0.3

hardhat-etherscan: ^2.1.8

hardhat-waffle: ^2.0.1


## Setup Command

config file .env
```
nano .env
#METAMASK

ACCOUNT=

#ETHERSCAN
#INFURA

RINKEBY=

WSS_ETH=

API_KEY_ETH=

CONTRACT_PROXY_ETH=

#BINANCE

API_KEY_BSC=

WSS_BSC=

CONTRACT_PROXY_BSC=

#SERVER
#HOST=127.0.0.1
PORT_SERVER=

#NETWORK

NAME_NETWORK_ETH=
CHAIN_ID_ETH=
SYMBOL_NETWORK_ETH=

NAME_NETWORK_BSC=
CHAIN_ID_BSC=
SYMBOL_NETWORK_BSC=

# REDIS-CACHED
REDIS_HOST=
REDIS_PORT=
REDIS_DB=
REDIS_PASSWORD=

# REDIS-QUEUE
REDIS_HOST_QUEUE=
REDIS_PORT_QUEUE=
REDIS_DB_QUEUE=
REDIS_PASSWORD_QUEUE=

#GRAPHSQL
BSC_GRAPHQL=
ETH_GRAPHQL=

```

install dependencies.   

`yarn install`

compile smart contract.    

`yarn compile` 

## Test Command
`yarn test`

## Deploy Verify Command
### Deploy smart contract use rinkeby network, infura API and etherscan for verify contracts   
### Alter key for INFURA_RINKEBY_URI, ACCOUNT and ETHERSCAN/BINANCE in .env.

Setting config network

```
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
    binance: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [ACCOUNT],
    },

    // //mainnet
    // ethereum: {
    //   url: `https://mainnet.infura.io/v3/${INFURA}`,
    //   accounts: [ACCOUNT],
    //   timeout: 20000,
    // },
    // binance: {
    //   url: "https://bsc-dataseed.binance.org/",
    //   chainId: 56,
    //   accounts: [ACCOUNT],
    // },
  },
  etherscan: {
    apiKey: BINANCE,
  }
}

```

**Deploy smart contract Dictionary**

`npx hardhat run scripts/Dictionary.deploy.js --network binance/rinkeby`

**Deploy smart contract master ERC20**

`npx hardhat run scripts/ERC20/MasterERC20.deploy.js --network binance/rinkeby`

**Deploy smart contract master ERC777**

`npx hardhat run scripts/ERC777/MasterERC777.deploy.js --network binance/rinkeby`

**Deploy smart contract master ERC721**

`npx hardhat run scripts/ERC721/MasterERC721.deploy.js --network binance/rinkeby`

**Deploy smart contract master ERC1155**

`npx hardhat run scripts/ERC1155/MasterERC1155.deploy.js --network binance/rinkeby`


**Auto verify contract**

`npx hardhat run main.js --network binance`

Deploy server nodejs, call method POST `host:port/verify` 
with req.body:
```
{
  "types": ["20burn","20pause","20standard"],
  "contractAddress": "0x24fd2f78c3C2c0C154Afc318522760751d0022b6",
  "address": "0x08f48161FE7b6C8eC3559f1928F381Ae88ad1522",
  "name": "MintableBurnable",
  "symbol": "LL",
  "decimal": 3,
  "totalSupply": 1000000,
  "cap": 100000000
}
```

## SPDX License Identifier: 
[MIT](https://choosealicense.com/licenses/mit/)





