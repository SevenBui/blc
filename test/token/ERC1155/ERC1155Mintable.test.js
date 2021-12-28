const { expect } = require('chai');

describe('ERC1155Mintable', async () => {
  let admin, artist, owner1, owner2;
  let token;
  let operator="0xaaB19dEFE682e16DB188fC49C6E489573387F36B";

  beforeEach(async () => {
    ([admin, artist, owner1, owner2] = await ethers.getSigners());
    const Token = await ethers.getContractFactory('ERC1155Mintable');
    token = await Token.deploy("token", "te",admin.address,1000,"ipfs://demo","ipfs://demo");
    await token.deployed();
  });

  context("name", () => {
    it("check name", async () => {
      expect(await token.name()).to.equal("token");
    })
  })
  context("symbol", () => {
    it("check symbol", async () => {
      expect(await token.symbol()).to.equal("te");
    })
  })


  context("totalSupply", () => {
    it("check totalSupply truoc khi tao token",async ()=>{
      expect(await token.totalSupply(1)).to.equal(1000);
    })

    it("check totalSupply sau khi tao token", async () => {
      await token.mintToken(admin.address,1000,"ipfs://mlfdjksdfv,fjhsdkjfmshdkmsk,cdfskd/metadata.json");

      expect(await token.totalSupply(2)).to.equal(1000);
    })
  })

  context("totalToken", () => {

    it("check totalToken sau khi mint", async () => {
      expect(await token.totalToken()).to.equal(1);
    })

    it("check totalToken sau khi mint", async () => {
      await token.mintToken(admin.address,1000,"ipfs://mlfdjksdfv,fjhsdkjfmshdkmsk,cdfskd/metadata.json");
      expect(await token.totalToken()).to.equal(2);
    })

  })


  context("uri", () => {
    it("check uri truoc khi tao toen", async () => {
      expect(await token.uri(2)).to.equal("");
    })

    it("check uri sau khi tao toen", async () => {
      let ipfs="ipfs://mlfdjksdfv,fjhsdkjfmshdkmsk,cdfskd/metadata.json";
      await token.mintToken(admin.address,1000,ipfs);
      expect(await token.uri(2)).to.equal(ipfs);
    })
  })

  context("balanceOf", () => {
    it("check balanceOf cua owner truoc khi mint token", async () => {
      expect(await token.balanceOf(admin.address,2)).to.equal(0);
    })
    it("check balanceOf cua owner sau khi mint token", async () => {
      
      await token.mintToken(admin.address,1000,"ipfs://mlfdjksdfv,fjhsdkjfmshdkmsk,cdfskd/metadata.json");

      expect(await token.balanceOf(admin.address,2)).to.equal(1000);
    })
  })

  context("balanceOfBatch", () => {
    it("check balanceOfBatch cua owner truoc khi mint token", async () => {
      let array= await token.balanceOfBatch([admin.address,artist.address],[2,2]);
      array==[0,0];
    })
    it("check balanceOfBatch cua owner sau khi mint token", async () => {
      
      await token.mintToken(admin.address,1000,"ipfs://mlfdjksdfv,fjhsdkjfmshdkmsk,cdfskd/metadata.json");
      await token.mintToken(artist.address,2000,"ipfs://mlfddsfsdfsfmshdkmsk,cdfskd/metadata.json");
      
      let array= await token.balanceOfBatch([admin.address,artist.address],[2,2]);
      array==[1000,2000];
    })
  })

  context("exists", () => {
    it("check exists truoc khi mint token", async () => {
      expect(await token.exists(2)).to.equal(false);
    })

    it("check exists sau khi mint token", async () => {      
      await token.mintToken(admin.address,1000,"ipfs://mlfdjksdfv,fjhsdkjfmshdkmsk,cdfskd/metadata.json");
      expect(await token.exists(2)).to.equal(true);
    })
  })

  context("setApprovalForAll", () => {
    it("check setApprovalForAll", async () => {
      await token.setApprovalForAll(operator,true);
    })
  })

  context("isApprovedForAll", () => {
    it("check isApprovedForAll", async () => {
      await token.setApprovalForAll(operator,true,{from:admin.address});
      expect(await token.isApprovedForAll(admin.address,operator)).to.equal(true);
    })
  })

  context("mintToken", () => {
    it("check mintToken", async () => {
      await token.mintToken(admin.address,1000,"ipfs://mlfdjksdfv,fjhsdkjfmshdkmsk,cdfskd/metadata.json");
    })
  })

  context("safeTransferFrom", () => {
    it("check safeTransferFrom", async () => {
      await token.mintToken(admin.address,1000,"ipfs://mlfdjksdfv,fjhsdkjfmshdkmsk,cdfskd/metadata.json");
      expect(await token.balanceOf(admin.address,2)).to.equal(1000);
      
      await token.safeTransferFrom(admin.address,owner1.address,2,500,'0x');
      expect(await token.balanceOf(owner1.address,2)).to.equal(500);
      expect(await token.balanceOf(admin.address,2)).to.equal(500);
    })
  })

  context("safeBatchTransferFrom", () => {
    it("check safeBatchTransferFrom", async () => {
      await token.mintToken(admin.address,1000,"ipfs://mlfdjksdfv,fjhsdkjfmshdkmsk,cdfskd/metadata.json");
      await token.mintToken(admin.address,2000,"ipfs://mlfdjksdfv,fjrgdfgdfsdfshdkmsk,cdfskd/metadata.json");

      expect(await token.balanceOf(admin.address,2)).to.equal(1000);
      expect(await token.balanceOf(admin.address,3)).to.equal(2000);
      
      await token.safeBatchTransferFrom(admin.address,owner1.address,[2,3],[500,1000],'0x');

      expect(await token.balanceOf(owner1.address,2)).to.equal(500);
      expect(await token.balanceOf(admin.address,2)).to.equal(500);

      expect(await token.balanceOf(owner1.address,3)).to.equal(1000);
      expect(await token.balanceOf(admin.address,3)).to.equal(1000);
    })
  })

  context("setApprovalForAll", () => {

    it("check setApprovalForAll sau khi opprove", async () => {
      expect(await token.isApprovedForAll(admin.address,operator)).to.equal(false);
    })

    it("check setApprovalForAll sau khi opprove", async () => {
      await token.setApprovalForAll(operator,true,{from:admin.address});
      expect(await token.isApprovedForAll(admin.address,operator)).to.equal(true);
    })

  })
})