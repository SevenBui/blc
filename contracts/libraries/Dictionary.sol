//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../access/GroupOwner.sol";
import "./interfaces/IDictionary.sol";

contract Dictionary is IDictionary, GroupOwnable {
  mapping(bytes32 => uint256) private fees;

  function getFee(string memory key) public view override returns (uint256) {
    bytes32 encodedKey = keccak256(abi.encodePacked(key));
    return fees[encodedKey];
  }

  function getFees(string[] memory keys)
    public
    view
    override
    returns (uint256)
  {
    uint256 fee;
    for (uint256 index = 0; index < keys.length; index++) {
      bytes32 encodedKey = keccak256(abi.encodePacked(keys[index]));
      fee += fees[encodedKey];
    }
    return fee;
  }

  function setFee(string memory key, uint256 value) public override groupOwner {
    bytes32 encodedKey = keccak256(abi.encodePacked(key));
    fees[encodedKey] = value;
  }

  function setFees(string[] memory key, uint256[] memory value)
    public
    override
    groupOwner
  {
    bytes32 encodedKey;
    for (uint256 index = 0; index < key.length; index++) {
      encodedKey = keccak256(abi.encodePacked(key[index]));
      fees[encodedKey] = value[index];
    }
  }

  function getEncodedKey(string memory key)
    public
    pure
    override
    returns (bytes32)
  {
    return keccak256(abi.encodePacked(key));
  }

}