const hre = require("hardhat");

async function main() {

    const SCPoolFactory = await hre.ethers.getContractFactory("BlockRewardStakingPool");
    const PoolFactory = await SCPoolFactory.deploy(
        '0xfe30f8be30cff400add30b527137c051824e6419',
        '0x8301f2213c0eed49a7e28ae4c3e91722919b8b47',
        '0x8301f2213c0eed49a7e28ae4c3e91722919b8b47',
        '1000000000',
        '1000000000000000000000000',
        '86400',
        '1637821800',
        '43200',
        '1000000000000'
    );

    await PoolFactory.deployed();

    console.log("BlockRewardStakingPool deployed to:", PoolFactory.address);

    await hre.run("verify:verify", {
        address: PoolFactory.address,
        constructorArguments: [
            '0xfe30f8be30cff400add30b527137c051824e6419',
            '0x8301f2213c0eed49a7e28ae4c3e91722919b8b47',
            '0x8301f2213c0eed49a7e28ae4c3e91722919b8b47',
            '1000000000',
            '1000000000000000000000000',
            '86400',
            '1637821800',
            '43200',
            '1000000000000'
        ],
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
