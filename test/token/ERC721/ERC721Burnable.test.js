const { expect } = require('chai');

describe('ERC721Burnable', async () => {
  let admin, artist, owner1, owner2;
  let token;


  beforeEach(async () => {
    ([admin, artist, owner1, owner2] = await ethers.getSigners());
    const Token = await ethers.getContractFactory('ERC721Burnable');
    token = await Token.deploy("token", "te",admin.address,"ipfs://demo","ipfs://demo");
    await token.deployed();

  });
  context("burn", () => {
    it("check burn", async () => {
      await token.mintToken(admin.address,"ipfs://sjdfnksdfhmsdfsjldvkgoigmdfkhfjd/metadata.json");
      expect(await token.balanceOf(admin.address)).to.equal(2);
      await token.burn(2);
      expect(await token.balanceOf(admin.address)).to.equal(1);
    })
  })

})