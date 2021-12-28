//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../access/Owner.sol";

interface IDictionary {
  function getFee(string memory key) external view returns (uint256);

  function setFee(string memory key, uint256 value) external;

  function setFees(string[] memory key, uint256[] memory value) external;

  function getEncodedKey(string memory key) external pure returns (bytes32);

  function getFees(string[] memory keys) external view returns (uint256);
}
