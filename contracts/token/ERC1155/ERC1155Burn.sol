// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC1155.sol";
import "../../libraries/Counters.sol";
import "../../access/Owner.sol";

contract ERC1155Burn is ERC1155, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping(uint256 => uint256) private _totalSupply;
  mapping(bytes32 => uint32) private types;

  constructor(
    string memory name,
    string memory symbol,
    address owner,
    uint256 amount,
    string memory metadata
  ) ERC1155(name, symbol) {
    transferOwnership(owner);
    if (
      keccak256(abi.encodePacked(metadata)) == keccak256(abi.encodePacked("1"))
    ) {
      require(amount == 0, "ERC1155: amount is zero");
    } else {
      _mintToken(owner, amount, metadata);
    }
  }

  function mint(
    address owner_,
    uint256 amount,
    string memory metadataURI
  ) public returns (uint256) {
    require(owner() == _msgSender(), "ERC1155Mint: caller is not owner");
    return _mintToken(owner_, amount, metadataURI);
  }

  function _mintToken(
    address owner_,
    uint256 amount,
    string memory metadataURI
  ) internal returns (uint256) {
    _tokenIds.increment();

    uint256 id = _tokenIds.current();
    _mint(owner_, id, amount, "");
    _setTokenURI(id, metadataURI);

    return id;
  }

  function totalToken() public view returns (uint256) {
    return _tokenIds.current();
  }

  function uri(uint256 _tokenId)
    public
    view
    override
    returns (string memory _uri)
  {
    return _tokenURI(_tokenId);
  }

  function totalSupply(uint256 id) public view virtual returns (uint256) {
    return _totalSupply[id];
  }

  function exists(uint256 id) public view virtual returns (bool) {
    return totalSupply(id) > 0;
  }

  function burn(
    address account,
    uint256 id,
    uint256 value
  ) public virtual {
    require(owner() == _msgSender(), "ERC1155Burn: caller is not owner");
    require(
      account == _msgSender() || isApprovedForAll(account, _msgSender()),
      "ERC1155: caller is not owner nor approved"
    );

    _burn(account, id, value);
  }

  function burnBatch(
    address account,
    uint256[] memory ids,
    uint256[] memory values
  ) public virtual {
    require(owner() == _msgSender(), "ERC11155Burn: caller is not owner");
    require(
      account == _msgSender() || isApprovedForAll(account, _msgSender()),
      "ERC1155: caller is not owner nor approved"
    );

    _burnBatch(account, ids, values);
  }

  function _mint(
    address account,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) internal virtual override {
    super._mint(account, id, amount, data);
    _totalSupply[id] += amount;
  }

  function _mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal virtual override {
    super._mintBatch(to, ids, amounts, data);
    for (uint256 i = 0; i < ids.length; ++i) {
      _totalSupply[ids[i]] += amounts[i];
    }
  }

  function _burn(
    address account,
    uint256 id,
    uint256 amount
  ) internal virtual override {
    super._burn(account, id, amount);
    _totalSupply[id] -= amount;
  }

  function _burnBatch(
    address account,
    uint256[] memory ids,
    uint256[] memory amounts
  ) internal virtual override {
    super._burnBatch(account, ids, amounts);
    for (uint256 i = 0; i < ids.length; ++i) {
      _totalSupply[ids[i]] -= amounts[i];
    }
  }
}
