const { expect, use } = require('chai');
const { deployContract, MockProvider, solidity } = require('ethereum-waffle');
const { waffle } = require('hardhat');
const ERC223 = require("../../../artifacts/contracts/token/ERC223/ERC223.sol/ERC223Token.json");
var { BigNumber } = require("bignumber.js");

use(solidity);

function convertBigNumber(bnAmount, divider) {
    return new BigNumber(bnAmount.toString()).dividedBy(new BigNumber(divider)).toFixed();
}

describe("ERC223", function () {
    const [wallet, walletTo] = waffle.provider.getWallets();

    let token;

    beforeEach(async function () {
        token = await deployContract(wallet, ERC223, ["MinhToken", "MTK", 18]);
    });

    it("name checked", async () => {
        const smartContractNameFromBlockChain = await token.name();
        const expectString = "MinhToken";
        expect(smartContractNameFromBlockChain).to.equal(expectString);
    });

    it("symbol checked", async () => {
        const smartContractNameFromBlockChain = await token.symbol();
        const expectString = "MTK";
        expect(smartContractNameFromBlockChain).to.equal(expectString);
    });

    it("decimal checked", async () => {
        const smartContractDecimalFromBlockChain = await token.decimals();
        const expectedNumber = 18;
        expect(smartContractDecimalFromBlockChain).to.equal(expectedNumber);
    });

    it('Assigns initial balance', async () => {
        // expect(await token.balanceOf(wallet.address)).to.equal(1000000000000000000000);
        const actual = await token.balanceOf(wallet.address);
        expect(convertBigNumber(new BigNumber(actual.toString()), 1e18)).to.equal("0");
      });

    it('Calls totalSupply on BasicToken contract', async () => {
        const totalSupply = await token.totalSupply();
        expect(+totalSupply).not.to.equal(undefined);
    });
});