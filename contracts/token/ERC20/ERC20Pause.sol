// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract ERC20Pause is ERC20 {
  constructor(
    address _owner,
    string memory name,
    string memory symbol,
    uint8 decimal,
    uint256 initialSupply
  ) ERC20(name, symbol, decimal) {
    require(_owner != address(0), "ERC20: address is not zero");
    transferOwnership(_owner);
    _mint(_owner, initialSupply);
  }

  // @dev Pausable
  function pauseToken() public virtual onlyOwner {
    _pause();
  }

  function unpauseToken() public virtual onlyOwner {
    _unpause();
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override {
    super._beforeTokenTransfer(from, to, amount);
    require(!checkPaused(), "ERC20Pausable: token transfer while paused");
  }
}
