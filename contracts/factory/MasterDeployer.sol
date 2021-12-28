//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../libraries/Dictionary.sol";
import "../proxy/Initializable.sol";
import "../access/OwnerUpgradeable.sol";

contract MasterDeployer is Initializable, OwnableUpgradeable {
  Dictionary private config;
  mapping(address => uint256) private balances;
  address private addrRecipient;

  event EventCreated(
    uint256 request_id,
    string[] key,
    address sender,
    string[] optionsKey,
    string[] optionsValue

  );
  event Transfer(address indexed from, address indexed to, uint256 value);

  function initialize(address _config) public virtual initializer {
    __MasterERC721_init(_config);
  }

  function __MasterERC721_init(address _config) internal initializer {
    __Ownable_init_unchained();
    __MasterERC721_init_unchained(_config);
  }

  function __MasterERC721_init_unchained(address _config) internal initializer {
    addrRecipient = owner();
    config = Dictionary(_config);
  }

  function createForm(
    string[] memory _keyTypes,
    string[] memory optionsKey,
    string[] memory optionsValue
  ) external payable {
    require(msg.value == config.getFees(_keyTypes), "Not enough value");

    uint256 request_id = block.timestamp;

    emit EventCreated(
      request_id,
      _keyTypes,
      msg.sender,
      optionsKey,
      optionsValue
    );

    balances[getRecipient()] += msg.value;
    _transfer(getRecipient(), balances[getRecipient()]);
  }

  function getRecipient() public view virtual returns (address) {
    return addrRecipient;
  }

  function setRecipient(address newAddr) public virtual onlyOwner {
    addrRecipient = newAddr;
  }

  function _transfer(address recipient, uint256 value) internal virtual {
    require(recipient != address(0), "Transfer to the zero address");
    balances[recipient] = 0;
    (bool success, ) = recipient.call{value: value}("");
    require(success, "Failed to send Ether");

    emit Transfer(owner(), recipient, value);
  }

  function transfer(address recipient, uint256 value) public virtual onlyOwner {
    _transfer(recipient, value);
  }
}
