// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract ERC20MintBurnPause is ERC20 {
  uint256 private cap_;

  constructor(
    address _owner,
    string memory name,
    string memory symbol,
    uint8 decimal,
    uint256 initialSupply,
    uint256 _cap
  ) ERC20(name, symbol, decimal) {
    require(_owner != address(0), "ERC20: address is not zero");
    transferOwnership(_owner);
    cap_ = _cap;
    _mint(_owner, initialSupply);
  }

  //@dev Mintable
  function mint(address to, uint256 amount) public virtual {
    require(owner() == _msgSender(), "ERC20: caller is not owner");
    _mint(to, amount);
  }

  function cap() public view virtual returns (uint256) {
    return cap_;
  }

  function _mint(address account, uint256 amount) internal virtual override {
    require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
    super._mint(account, amount);
  }

  // @dev Burnable
  function burn(uint256 amount) public virtual {
    require(owner() == _msgSender(), "ERC20: caller is not owner");
    _burn(_msgSender(), amount);
  }

  function burnFrom(address account, uint256 amount) public virtual {
    uint256 currentAllowance = allowance(account, _msgSender());
    require(currentAllowance != 0, "ERC20: sender is not approve");
    require(currentAllowance >= amount, "ERC20: burn amount exceeds allowance");
    unchecked {
      _approve(account, _msgSender(), currentAllowance - amount);
    }
    _burn(account, amount);
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
