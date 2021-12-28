// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./Owner.sol";

abstract contract ContractOwnable is Ownable {
  address private addressContract;

  mapping(address => bool) public ownerByAddress;

  event SetContractOwner(address addressContract);

  /**
   * @dev Initializes the contract setting the deployer as the initial owner.
   */
  constructor() {
    setContractOwner(_msgSender());
  }

  /**
   * @dev contractOwner.
   */
  modifier contractOwner(address cOwner) {
    require(
      addressContract == cOwner,
      "ContractOwner: caller is not the contract owner"
    );
    _;
  }

  /**
   * @dev Function to set owner contract
   */
  function setContractOwner(address _addressContract) public virtual onlyOwner {
    _setContractOwner(_addressContract);
  }

  function _setContractOwner(address _addressContract) private {
    addressContract = _addressContract;
    emit SetContractOwner(addressContract);
  }

  function getContractOwner() public view virtual returns (address) {
    return addressContract;
  }
}
