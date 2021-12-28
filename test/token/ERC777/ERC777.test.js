const { expect, use } = require('chai');
const { deployContract, MockProvider, solidity } = require('ethereum-waffle');
const { waffle } = require('hardhat');

const ERC777 = require("../../../artifacts/contracts/token/ERC777/ERC777.sol/ERC777.json");

use(solidity);
// // function convertBigNumber(bnAmount, divider) {
// //   return new BigNumber(bnAmount.toString()).dividedBy(new BigNumber(divider)).toFixed();
// // }


describe("ERC777FixedSupply", function () {
  const [wallet, walletTo] = waffle.provider.getWallets();

  let token;

  beforeEach(async function () {
    token = await deployContract(wallet, ERC777,["MinhToken", "MTK", 18, ['']]);
  });

  it("name checked", async () => {
    const smartContractNameFromBlockChain = await token.name();
    const expectString = "MinhToken";
    expect(smartContractNameFromBlockChain).to.equal(expectString);
  });

  it("symbol checked", async () => {
    const smartContractSymbolFromBlockChain = await token.symbol();
    const expectString = "MTK";
    expect(smartContractSymbolFromBlockChain).to.equal(expectString);
  });
  it("decimal checked", async () => {
    const smartContractDecimalFromBlockChain = await token.decimals();
    const expectedNumber = 18;
    expect(smartContractDecimalFromBlockChain).to.equal(expectedNumber);
  });

  it('Calls totalSupply on BasicToken contract', async () => {
    const totalSupply = await token.totalSupply();
    expect(+totalSupply).not.to.equal(undefined);
  });

  it('Assigns initial balance', async () => {
    expect(await token.balanceOf(wallet.address)).to.equal(0);
  });


  it('Transfer adds amount to destination account', async () => {
    await token.transfer(walletTo.address, 0);
    expect(await token.balanceOf(walletTo.address)).to.equal(0);
  });

  it('Transfer emits event', async () => {
    await expect(token.transfer(walletTo.address, 0))
      .to.emit(token, 'Transfer')
      .withArgs(wallet.address, walletTo.address, 0);
  });

  it('Can not transfer above the amount', async () => {
    await expect(token.transfer(walletTo.address, 1007)).to.be.reverted;
  });

  it('Calls balanceOf with sender address on BasicToken contract', async () => {
    const curBalance = await token.balanceOf(wallet.address);
    expect(curBalance).to.be.equal(0);
  });

});