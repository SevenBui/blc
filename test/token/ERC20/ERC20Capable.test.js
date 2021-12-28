const { expect, use } = require('chai');
// import { Contract } from 'ethers';
const { deployContract, MockProvider, solidity } = require('ethereum-waffle');
const { waffle } = require('hardhat');

const ERC20Mint = require("../../../artifacts/contracts/token/ERC20/ERC20Mintable.sol/ERC20Mintable.json");

use(solidity);

describe("ERC20Capable", function () {
    const [wallet, walletTo] = waffle.provider.getWallets();
    let token;
    beforeEach(async function () {
        token = await deployContract(wallet, ERC20Mint, ["0x73D76C9743f9e0608e5Bb9063533289190855cA4", 10000, "MinhToken", "MTK", 18, 1000]);
    });

    it('capped mint', async () => {
        const cap = await token.cap();
        expect(+cap).not.to.equal(undefined);
    });


})
