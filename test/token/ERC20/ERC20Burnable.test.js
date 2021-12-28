const { expect, use } = require('chai');
// import { Contract } from 'ethers';
const { deployContract, MockProvider, solidity } = require('ethereum-waffle');
const { waffle } = require('hardhat');

const ERC20Burnable = require("../../../artifacts/contracts/token/ERC20/ERC20Burnable.sol/ERC20Burnable.json");

use(solidity);

describe("ERC20Burnable", function () {
    const [wallet, walletTo] = waffle.provider.getWallets();
    let token;
    beforeEach(async function () {
        token = await deployContract(wallet, ERC20Burnable, ["0x73D76C9743f9e0608e5Bb9063533289190855cA4", "MinhToken", "MTK", 18, 1000]);
    });

    it('Burn test', async () => {
        await token.burn(0);
        expect(await token.balanceOf(walletTo.address)).to.equal(0);
    });
})
