// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC777.sol";

contract ERC777Standard is ERC777 {
  uint256 private _cap;

  constructor(
    string memory name,
    string memory symbol,
    uint8 decimal,
    uint256 initialSupply,
    address _owner
  ) ERC777(name, symbol, decimal, new address[](0)) {
    transferOwnership(_owner);
    _mint(_owner, initialSupply, "", "");
  }
}
