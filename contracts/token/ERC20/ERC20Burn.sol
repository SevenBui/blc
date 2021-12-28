// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract ERC20Burn is ERC20 {
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
}
