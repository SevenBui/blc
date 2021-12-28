const { expect } = require('chai');

describe('ERC1155Mintable', async () => {
  let admin, artist, owner1, owner2;
  let token;


  beforeEach(async () => {
    ([admin, artist, owner1, owner2] = await ethers.getSigners());
    const Token = await ethers.getContractFactory('ERC1155Burnable');
    token = await Token.deploy("token", "te",admin.address,1000,"ipfs://demo","ipfs://demo");
    await token.deployed();
  });

  context("burn", () => {
    it("check burn", async () => {
      await token.mintToken(admin.address,1000,"ipfs://sjdfnksdfhmsdfsjldvkgoigmdfkhfjd/metadata.json");
      expect(await token.balanceOf(admin.address,2)).to.equal(1000);

      await token.burn(admin.address,2,500);
      expect(await token.balanceOf(admin.address,2)).to.equal(500);
      
    })
  })

  context("burnBatch", () => {
    it("check burnBatch", async () => {
      await token.mintToken(admin.address,1000,"ipfs://sjdfnksdfhmsdfsjldvkgoigmdfkhfjd/metadata.json");
      await token.mintToken(admin.address,2000,"ipfs://sjdfnksregdfdhgfgdsfvsdfsdfgoigmdfkhfjd/metadata.json");
      
      expect(await token.balanceOf(admin.address,2)).to.equal(1000);
      expect(await token.balanceOf(admin.address,3)).to.equal(2000);

      await token.burnBatch(admin.address,[2,3],[500,1000]);

      expect(await token.balanceOf(admin.address,2)).to.equal(500);
      expect(await token.balanceOf(admin.address,3)).to.equal(1000);
      
    })
  })
})