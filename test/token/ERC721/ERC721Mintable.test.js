const { expect } = require('chai');

describe('ERC721Mintable', async () => {
    let admin, artist, owner1, owner2;
    let token;
    let operator="0xaaB19dEFE682e16DB188fC49C6E489573387F36B";

    beforeEach(async () => {
        ([admin, artist, owner1, owner2] = await ethers.getSigners());
        const Token = await ethers.getContractFactory('ERC721Mintable');
        token = await Token.deploy("token", "te",admin.address,"ipfs://demo","ipfs://demo");
        await token.deployed();
       
    });

    context("owner", () => {
        it("check owner", async () => {
            expect(await token.owner()).to.equal(admin.address);
        })
    })

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
        it("check totalSupply truoc khi tao token", async () => {
            expect(await token.totalSupply()).to.equal(1);
        })

        it("check totalSupply sau khi tao token", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");
            expect(await token.totalSupply()).to.equal(2);
        })
    })

    context("balanceOf", () => {
        it("check balanceOf == 1", async () => {
            expect(await token.balanceOf(admin.address)).to.equal(1);
        })

        it("check balanceOf == 2", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");
            expect(await token.balanceOf(admin.address)).to.equal(2);
        })
    })

    context("mintToken", () => {

        it("check owner truoc khi tao nft", async () => {
        
            await token.mintToken(artist.address, "ipfs://nguyendaccuong/metadata.json");
            expect(await token.tokenURI(2)).to.equal("ipfs://nguyendaccuong/metadata.json");   
           
        })
        it("check tokenURI sau khi tao mintTOken", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");
            expect(await token.tokenURI(2)).to.equal("ipfs://nguyendaccuong/metadata.json");
        })
        it("check balanceOf sau khi tao mintTOken", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");
            expect(await token.balanceOf(admin.address)).to.equal(2);
        })
    })

    context("ownerOf", () => {
        it("check token da tao cua user", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");
            let address = await token.ownerOf(2);
            expect(address).to.equal(admin.address)
        })

    })

    context("transferFrom", () => {
        it("chuyen from sang to 1 token", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");

            expect(await token.balanceOf(admin.address)).to.equal(2);
            expect(await token.tokenURI(2)).to.equal("ipfs://nguyendaccuong/metadata.json");

            await token.transferFrom(admin.address, owner2.address, 2);
            expect(await token.balanceOf(owner2.address)).to.equal(1);

            expect(await token.balanceOf(admin.address)).to.equal(1);
        })
    })
    context("approve", () => {
        it("Gives permission to to to transfer tokenId token to another account", async () => {
            await token.approve(operator, 1, { from: admin.address });
            let approve = await token.getApproved(1);
            expect(approve).to.equal(operator);
        })
    })

    context("getApproved", () => {
        it("check getApproved", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");
            expect(await token.balanceOf(admin.address)).to.equal(2);
            await token.approve(operator, 2, { from: admin.address });
            let approve = await token.getApproved(2);
            expect(approve).to.equal(operator);
        })
    })

    context('setApproveForAll', function () {
        it("check setApproveForAll", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");
            await token.setApprovalForAll(operator, true, { from: admin.address });
            expect(await token.isApprovedForAll( admin.address,operator)).to.equal(true);
        })

    });

    context('isApprovedForAll', function () {
        it("check isApprovedForAll", async () => {
            await token.setApprovalForAll(operator, true, { from: admin.address });
            expect(await token.isApprovedForAll( admin.address,operator)).to.equal(true);
        })

        it("check isApprovedForAll", async () => {
            await token.setApprovalForAll(operator, false, { from: admin.address });
            expect(await token.isApprovedForAll( admin.address,operator)).to.equal(false);
        })

    });

    context("safeTransferFrom", () => {
        it("check safeTransferFrom", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");

            expect(await token.balanceOf(admin.address)).to.equal(2);

            await token.functions['safeTransferFrom(address,address,uint256)'](admin.address, owner1.address, 2);

            expect(await token.balanceOf(owner1.address)).to.equal(1);
            expect(await token.balanceOf(admin.address)).to.equal(1);

        })
    })

    context("supportsInterface", () => {
        it("check supportsInterface ERC0", async () => {
            let bool1=await token.supportsInterface(0xffffffff);//erc0
            expect(bool1).to.equal(false); 
        })
        it("check supportsInterface ERC165", async () => {
            let bool2=await token.supportsInterface(0x01ffc9a7);//erc165
            expect(bool2).to.equal(true); 
        })
        it("check supportsInterface ERC721", async () => {
            let bool3=await token.supportsInterface(0x80ac58cd);//erc721
            expect(bool3).to.equal(true);  
        })
    })

    context("tokenURI", () => {
        it("check tokenURI truoc khi tao mintTOken", async () => {
            expect(await token.tokenURI(1)).to.equal("ipfs://demo");
        })
        it("check tokenURI sau khi tao mintTOken", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");
            expect(await token.tokenURI(2)).to.equal("ipfs://nguyendaccuong/metadata.json");
        })
    })

    context("tokenOfOwnerByIndex", () => {
        it("check tokenOfOwnerByIndex", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");
            expect(await token.tokenOfOwnerByIndex(admin.address,1)).to.equal(2);
        })
    })

    context("tokenByIndex", () => {
        it("check tokenByIndex", async () => {
            await token.mintToken(admin.address, "ipfs://nguyendaccuong/metadata.json");
            expect(await token.tokenByIndex(1)).to.equal(2);
        })
    })


});