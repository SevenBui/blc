//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC721URIStorage.sol";
import "../../libraries/Counters.sol";
import "../../access/Owner.sol";

contract ERC721Burn is Ownable, ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor(
    string memory name,
    string memory symbol,
    address _owner,
    string memory metadata
  ) ERC721(name, symbol) {
    transferOwnership(_owner);
    if (
      keccak256(abi.encodePacked(metadata)) != keccak256(abi.encodePacked("1"))
    ) {
      _mintToken(_owner, metadata);
    }
  }

  function mint(address owner_, string memory metadataURI)
    public
    returns (uint256)
  {
    require(owner() == _msgSender(), "ERC1155Mint: caller is not owner");
    return _mintToken(owner_, metadataURI);
  }

  function _mintToken(address owner_, string memory metadataURI)
    internal
    returns (uint256)
  {
    _tokenIds.increment();

    uint256 id = _tokenIds.current();
    _safeMint(owner_, id);
    _setTokenURI(id, metadataURI);

    return id;
  }

  function burn(uint256 tokenId) public virtual {
    require(
      _isApprovedOrOwner(_msgSender(), tokenId),
      "ERC721Burn: caller is not owner nor approved"
    );
    _burn(tokenId);
  }
}
