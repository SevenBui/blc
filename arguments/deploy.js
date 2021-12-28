const hre = require("hardhat");
const Big = require('big.js');

var mapDeploy = {};

mapDeploy.erc20 = {
    standard: async (data) => {
        const ERC1_20 = await hre.ethers.getContractFactory("ERC20Standard");
        const erc1_20 = await ERC1_20.deploy(data.walletMetamask,
            data.tokenName, data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc1_20.deployed();
        console.log("Deploy standard", erc1_20.address);
        return erc1_20;
    },
    mint_standard: async (data) => {
        const ERC2_20 = await hre.ethers.getContractFactory("ERC20Mint");
        const erc2_20 = await ERC2_20.deploy(data.walletMetamask,
            data.tokenName, data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            Big(parseInt(data.supplyCap) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc2_20.deployed();
        console.log("ERC20Mint deployed to:", erc2_20.address);
        return erc2_20;
    },
    burn_standard: async (data) => {
        const ERC3_20 = await hre.ethers.getContractFactory("ERC20Burn");
        const erc3_20 = await ERC3_20.deploy(data.walletMetamask,
            data.tokenName, data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc3_20.deployed();
        console.log("ERC20Burn deployed to:", erc3_20.address);
        return erc3_20;
    },
    pause_standard: async (data) => {
        const ERC4_20 = await hre.ethers.getContractFactory("ERC20Pause");
        const erc4_20 = await ERC4_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc4_20.deployed();
        console.log("ERC20Pause deployed to:", erc4_20.address);
        return erc4_20;
    },
    governance_standard: async (data) => {
        const ERC5_20 = await hre.ethers.getContractFactory("ERC20Governance");
        const erc5_20 = await ERC5_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc5_20.deployed();
        console.log("ERC20Governance deployed to:", erc5_20.address);
        return erc5_20;

    },
    burn_mint_standard: async (data) => {
        const ERC6_20 = await hre.ethers.getContractFactory("ERC20MintBurn");
        const erc6_20 = await ERC6_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            Big(parseInt(data.supplyCap) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc6_20.deployed();
        console.log("ERC20MintBurn deployed to:", erc6_20.address);
        return erc6_20;
    },
    mint_pause_standard: async (data) => {
        const ERC7_20 = await hre.ethers.getContractFactory("ERC20MintPause");
        const erc7_20 = await ERC7_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            Big(parseInt(data.supplyCap) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc7_20.deployed();
        console.log("ERC20MintPause deployed to:", erc7_20.address);
        return erc7_20;
    },
    governance_mint_standard: async (data) => {
        const ERC8_20 = await hre.ethers.getContractFactory("ERC20MintGovernance");
        const erc8_20 = await ERC8_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            Big(parseInt(data.supplyCap) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc8_20.deployed();
        console.log("ERC20MintGovernance deployed to:", erc8_20.address);
        return erc8_20;
    },
    burn_pause_standard: async (data) => {
        const ERC9_20 = await hre.ethers.getContractFactory("ERC20BurnPause");
        const erc9_20 = await ERC9_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc9_20.deployed();
        console.log("ERC20BurnPause deployed to:", erc9_20.address);
        return erc9_20;
    },
    burn_governance_standard: async (data) => {
        const ERC10_20 = await hre.ethers.getContractFactory("ERC20BurnGovernance");
        const erc10_20 = await ERC10_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc10_20.deployed();
        console.log("ERC20BurnGovernance deployed to:", erc10_20.address);
        return erc10_20;
    },
    governance_pause_standard: async (data) => {
        const ERC11_20 = await hre.ethers.getContractFactory("ERC20PauseGovernance");
        const erc11_20 = await ERC11_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc11_20.deployed();
        console.log("ERC20PauseGovernance deployed to:", erc11_20.address);
        return erc11_20;
    },
    burn_mint_pause_standard: async (data) => {
        const ERC12_20 = await hre.ethers.getContractFactory("ERC20MintBurnPause");
        const erc12_20 = await ERC12_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            Big(parseInt(data.supplyCap) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc12_20.deployed();
        console.log("ERC20MintBurnPause deployed to:", erc12_20.address);
        return erc12_20;
    },
    burn_governance_mint_standard: async (data) => {
        const ERC13_20 = await hre.ethers.getContractFactory("ERC20MintBurnGovernance");
        const erc13_20 = await ERC13_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            Big(parseInt(data.supplyCap) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc13_20.deployed();
        console.log("ERC20MintBurnGovernance deployed to:", erc13_20.address);
        return erc13_20;
    },
    governance_mint_pause_standard: async (data) => {
        const ERC14_20 = await hre.ethers.getContractFactory("ERC20MintPauseGovernance");
        const erc14_20 = await ERC14_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            Big(parseInt(data.supplyCap) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc14_20.deployed();
        console.log("ERC20MintPauseGovernance deployed to:", erc14_20.address);
        return erc14_20;
    },
    burn_governance_pause_standard: async (data) => {
        const ERC15_20 = await hre.ethers.getContractFactory("ERC20BurnPauseGovernance");
        const erc15_20 = await ERC15_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc15_20.deployed();
        console.log("ERC20BurnPauseGovernance deployed to:", erc15_20.address);
        return erc15_20;
    },
    burn_governance_mint_pause_standard: async (data) => {
        const ERC16_20 = await hre.ethers.getContractFactory("ERC20MintBurnPauseGovernance");
        const erc16_20 = await ERC16_20.deploy(data.walletMetamask,
            data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            Big(parseInt(data.supplyCap) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed());
        await erc16_20.deployed();
        console.log("ERC20MintBurnPauseGovernance deployed to:", erc16_20.address);
        return erc16_20;
    }
}

mapDeploy.erc777 = {
    burn: async (data) => {
        const ERC1_777 = await hre.ethers.getContractFactory("ERC777Standard");
        const erc1_777 = await ERC1_777.deploy(data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(), data.walletMetamask);
        await erc1_777.deployed();
        console.log("ERC777Standard deployed to:", erc1_777.address);
        return erc1_777;
    },
    burn_mint: async (data) => {
        const ERC2_777 = await hre.ethers.getContractFactory("ERC777Mint");
        const erc2_777 = await ERC2_777.deploy(data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            Big(parseInt(data.supplyCap) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            data.walletMetamask);
        await erc2_777.deployed();
        console.log("ERC777Mint deployed to:", erc2_777.address);
        return erc2_777;
    },
    burn_governance: async (data) => {
        const ERC3_777 = await hre.ethers.getContractFactory("ERC777Governance");
        const erc3_777 = await ERC3_777.deploy(data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            data.walletMetamask);
        await erc3_777.deployed();
        console.log("ERC777Governance deployed to:", erc3_777.address);
        return erc3_777;
    },
    burn_governance_mint: async (data) => {
        const ERC4_777 = await hre.ethers.getContractFactory("ERC777MintGovernance");
        const erc4_777 = await ERC4_777.deploy(data.tokenName,
            data.tokenSymbol,
            parseInt(data.tokenDecimal),
            Big(parseInt(data.initialSupply) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            Big(parseInt(data.supplyCap) * Math.pow(10, parseInt(data.tokenDecimal))).toFixed(),
            data.walletMetamask);
        await erc4_777.deployed();
        console.log("ERC777MintGovernance deployed to:", erc4_777.address);
        return erc4_777;
    }
}

mapDeploy.erc721 = {
    mint: async (data) => {
        const ERC1_721 = await hre.ethers.getContractFactory("ERC721Standard");
        const erc1_721 = await ERC1_721.deploy(
            data.tokenName,
            data.tokenSymbol,
            data.walletMetamask,
            data.metadata);
        await erc1_721.deployed();
        console.log("ERC721Standard deployed to:", erc1_721.address);
        return erc1_721;
    },
    burn_mint: async (data) => {
        const ERC2_721 = await hre.ethers.getContractFactory("ERC721Burn");
        const erc2_721 = await ERC2_721.deploy(
            data.tokenName,
            data.tokenSymbol,
            data.walletMetamask,
            data.metadata);
        await erc2_721.deployed();
        console.log("ERC721Burn deployed to:", erc2_721.address);
        return erc2_721;
    }
}

mapDeploy.erc1155 = {
    mint: async (data) => {
        const ERC1_1155 = await hre.ethers.getContractFactory("ERC1155Standard");
        const erc1_1155 = await ERC1_1155.deploy(
            data.tokenName,
            data.tokenSymbol,
            data.walletMetamask,
            data.numberOfCopies,
            data.metadata);
        await erc1_1155.deployed();
        console.log("ERC1155Standard deployed to:", erc1_1155.address);
        return erc1_1155;
    },
    burn_mint: async (data) => {
        const ERC2_1155 = await hre.ethers.getContractFactory("ERC1155Burn");
        const erc2_1155 = await ERC2_1155.deploy(
            data.tokenName,
            data.tokenSymbol,
            data.walletMetamask,
            data.numberOfCopies,
            data.metadata);
        await erc2_1155.deployed();
        console.log("ERC1155Burn deployed to:", erc2_1155.address);
        return erc2_1155;
    }
}

mapDeploy.pool = {
    staking: async (data) => {
        const SCPoolFactory = await hre.ethers.getContractFactory("BlockRewardStakingPool");
        const PoolFactory = await SCPoolFactory.deploy(
            data.walletMetamask,
            data.stakingToken,
            data.rewardToken,
            Big(parseInt(data.minInvestment) * Math.pow(10, parseInt(data.decimal))).toFixed(),
            Big(parseInt(data.maxInvestment) * Math.pow(10, parseInt(data.decimal))).toFixed(),
            data.lockDuration,
            data.startDate,
            data.duration,
            Big(parseInt(data.rewardPerBlock) * Math.pow(10, parseInt(data.decimal))).toFixed()
        );

        await PoolFactory.deployed();
        console.log("BlockRewardStakingPool deployed to:", PoolFactory.address);
        return PoolFactory;
    },
    staking_apr: async (data) => {
        const SCPoolFactory = await hre.ethers.getContractFactory("FixedAPRStakingPool");
        const PoolFactory = await SCPoolFactory.deploy(
            data.walletMetamask,
            data.stakingToken,
            data.rewardToken,
            Big(parseInt(data.minInvestment) * Math.pow(10, parseInt(data.decimal))).toFixed(),
            Big(parseInt(data.maxInvestment) * Math.pow(10, parseInt(data.decimal))).toFixed(),
            data.lockDuration,
            data.startDate,
            data.duration,
            data.apr
        );

        await PoolFactory.deployed();
        console.log("FixedAPRStakingPool deployed to:", PoolFactory.address);
        return PoolFactory;
    },
    farming: async (data) => {
        const SCPoolFactory = await hre.ethers.getContractFactory("BlockRewardFarmingPool");
        const PoolFactory = await SCPoolFactory.deploy(
            data.walletMetamask,
            data.stakingToken,
            data.rewardToken,
            data.lockDuration,
            data.startDate,
            data.duration,
            Big(parseInt(data.rewardPerBlock) * Math.pow(10, parseInt(data.decimal))).toFixed()
        );

        await PoolFactory.deployed();
        console.log("BlockRewardFarmingPool deployed to:", PoolFactory.address);
        return PoolFactory;
    }
}

module.exports = {
    mapDeploy
}