// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC777.sol";

contract ERC777Mint is ERC777 {
  uint256 private _cap;

  constructor(
    string memory name,
    string memory symbol,
    uint8 decimal,
    uint256 initialSupply,
    uint256 cap_,
    address _owner
  ) ERC777(name, symbol, decimal, new address[](0)) {
    transferOwnership(_owner);
    _cap = cap_;
    _mint(_owner, initialSupply, "", "");
  }

  //@dev Mintable
  function mint(
    address account,
    uint256 amount,
    bytes memory userData,
    bytes memory operatorData
  ) public virtual {
    require(owner() == _msgSender(), "ERC777: caller is not owner");
    require(
      ERC777.totalSupply() + amount <= cap(),
      "ERC777Capped: cap exceeded"
    );
    _mint(account, amount, userData, operatorData);
  }

  function _mint(
    address account,
    uint256 amount,
    bytes memory userData,
    bytes memory operatorData
  ) internal virtual override {
    require(ERC777.totalSupply() + amount <= cap(), "ERC777Capped: cap exceeded");
    super._mint(account, amount, userData, operatorData);
  }

  function cap() public view virtual returns (uint256) {
    return _cap;
  }
}
