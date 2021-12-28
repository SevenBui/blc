const hre = require("hardhat");
const Big = require('big.js');

var mapVerify = {};

mapVerify.erc20 = {
    standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20Standard.sol:ERC20Standard",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    mint_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20Mint.sol:ERC20Mint",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.cap) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    burn_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20Burn.sol:ERC20Burn",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    pause_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20Pause.sol:ERC20Pause",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    governance_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20Governance.sol:ERC20Governance",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    burn_mint_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20MintBurn.sol:ERC20MintBurn",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.cap) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    mint_pause_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20MintPause.sol:ERC20MintPause",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.cap) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    governance_mint_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20MintGovernance.sol:ERC20MintGovernance",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.cap) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    burn_pause_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20BurnPause.sol:ERC20BurnPause",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    burn_governance_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20BurnGovernance.sol:ERC20BurnGovernance",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    governance_pause_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20PauseGovernance.sol:ERC20PauseGovernance",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    burn_mint_pause_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20MintBurnPause.sol:ERC20MintBurnPause",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.cap) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    burn_governance_mint_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20MintBurnGovernance.sol:ERC20MintBurnGovernance",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.cap) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    governance_mint_pause_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20MintPauseGovernance.sol:ERC20MintPauseGovernance",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.cap) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    burn_governance_pause_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20BurnPauseGovernance.sol:ERC20BurnPauseGovernance",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    },
    burn_governance_mint_pause_standard: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC20/ERC20MintBurnPauseGovernance.sol:ERC20MintBurnPauseGovernance",
            constructorArguments: [
                data.sender,
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.cap) * Math.pow(10, parseInt(data.options.decimal))).toFixed()]
        });
    }
}

mapVerify.erc777 = {
    burn: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC777/ERC777Standard.sol:ERC777Standard",
            constructorArguments: [
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                data.sender]
        });
    },
    burn_mint: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC777/ERC777Mint.sol:ERC777Mint",
            constructorArguments: [
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.cap) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                data.sender]
        });
    },
    burn_governance: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC777/ERC777Governance.sol:ERC777Governance",
            constructorArguments: [
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                data.sender]
        });
    },
    burn_governance_mint: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC777/ERC777MintGovernance.sol:ERC777MintGovernance",
            constructorArguments: [
                data.options.name,
                data.options.symbol,
                data.options.decimal,
                Big(parseInt(data.options.initialSupply) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.cap) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                data.sender]
        });
    }
}

mapVerify.erc721 = {
    mint: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC721/ERC721Standard.sol:ERC721Standard",
            constructorArguments: [
                data.options.name,
                data.options.symbol,
                data.sender,
                data.options.metadata]
        });
    },
    burn_mint: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC721/ERC721Burn.sol:ERC721Burn",
            constructorArguments: [
                data.options.name,
                data.options.symbol,
                data.sender,
                data.options.metadata]
        });
    }
}

mapVerify.erc1155 = {
    mint: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC1155/ERC1155Standard.sol:ERC1155Standard",
            constructorArguments: [
                data.options.name,
                data.options.symbol,
                data.sender,
                data.options.amount,
                data.options.metadata]
        });
    },
    burn_mint: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            contract: "contracts/token/ERC1155/ERC1155Burn.sol:ERC1155Burn",
            constructorArguments: [
                data.options.name,
                data.options.symbol,
                data.sender,
                data.options.amount,
                data.options.metadata]
        });
    }
}

mapVerify.pool = {
    staking: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            constructorArguments: [
                data.sender,
                data.options.stakingToken,
                data.options.rewardToken,
                Big(parseInt(data.options.minInvestment) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.maxInvestment) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                data.options.lockDuration,
                data.options.startDate,
                data.options.duration,
                Big(parseInt(data.options.rewardPerBlock) * Math.pow(10, parseInt(data.options.decimal))).toFixed()
            ]
        });
    },
    staking_apr: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            constructorArguments: [
                data.sender,
                data.options.stakingToken,
                data.options.rewardToken,
                Big(parseInt(data.options.minInvestment) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                Big(parseInt(data.options.maxInvestment) * Math.pow(10, parseInt(data.options.decimal))).toFixed(),
                data.options.lockDuration,
                data.options.startDate,
                data.options.duration,
                data.options.apr
            ]
        });
    },
    farming: async (data) => {
        await hre.run("verify:verify", {
            address: data.contractAddress,
            constructorArguments: [
                data.sender,
                data.options.stakingToken,
                data.options.rewardToken,
                data.options.lockDuration,
                data.options.startDate,
                data.options.duration,
                Big(parseInt(data.options.rewardPerBlock) * Math.pow(10, parseInt(data.options.decimal))).toFixed()
            ]
        });
    }
}

module.exports = {
    mapVerify
}