// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC777.sol";

contract ERC777MintGovernance is ERC777 {
  // @dev Governance
  mapping(address => address) internal _delegates;
  struct Checkpoint {
    uint32 fromBlock;
    uint256 votes;
  }
  mapping(address => mapping(uint32 => Checkpoint)) public checkpoints;
  mapping(address => uint32) public numCheckpoints;
  bytes32 public constant DOMAIN_TYPEHASH =
    keccak256(
      "EIP712Domain(string name,uint256 chainId,address verifyingContract)"
    );
  bytes32 public constant DELEGATION_TYPEHASH =
    keccak256("Delegation(address delegatee,uint256 nonce,uint256 expiry)");

  mapping(address => uint256) public nonces;

  // @dev Delegate
  event DelegateChanged(
    address indexed delegator,
    address indexed fromDelegate,
    address indexed toDelegate
  );

  event DelegateVotesChanged(
    address indexed delegate,
    uint256 previousBalance,
    uint256 newBalance
  );

  mapping(bytes32 => uint32) private types;
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
    _moveDelegates(address(0), _delegates[_owner], initialSupply);
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
    _moveDelegates(address(0), _delegates[account], amount);
  }

  function _mint(
    address account,
    uint256 amount,
    bytes memory userData,
    bytes memory operatorData
  ) internal virtual override {
    require(
      ERC777.totalSupply() + amount <= cap(),
      "ERC777Capped: cap exceeded"
    );
    super._mint(account, amount, userData, operatorData);
  }

  function cap() public view virtual returns (uint256) {
    return _cap;
  }

  //@dev governance
  function delegates(address delegator) external view returns (address) {
    return _delegates[delegator];
  }

  function delegate(address delegatee) external {
    return _delegate(msg.sender, delegatee);
  }

  function delegateBySig(
    address delegatee,
    uint256 nonce,
    uint256 expiry,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external {
    bytes32 domainSeparator = keccak256(
      abi.encode(
        DOMAIN_TYPEHASH,
        keccak256(bytes(name())),
        getChainId(),
        address(this)
      )
    );

    bytes32 structHash = keccak256(
      abi.encode(DELEGATION_TYPEHASH, delegatee, nonce, expiry)
    );

    bytes32 digest = keccak256(
      abi.encodePacked("\x19\x01", domainSeparator, structHash)
    );

    address signatory = ecrecover(digest, v, r, s);
    require(signatory != address(0), "delegateBySig: invalid signature");
    require(nonce == nonces[signatory]++, "delegateBySig: invalid nonce");
    require(block.timestamp <= expiry, "delegateBySig: signature expired");
    return _delegate(signatory, delegatee);
  }

  function getCurrentVotes(address account) external view returns (uint256) {
    uint32 nCheckpoints = numCheckpoints[account];
    return nCheckpoints > 0 ? checkpoints[account][nCheckpoints - 1].votes : 0;
  }

  function getPriorVotes(address account, uint256 blockNumber)
    external
    view
    returns (uint256)
  {
    require(blockNumber < block.number, "getPriorVotes: not yet determined");

    uint32 nCheckpoints = numCheckpoints[account];
    if (nCheckpoints == 0) {
      return 0;
    }

    // First check most recent balance
    if (checkpoints[account][nCheckpoints - 1].fromBlock <= blockNumber) {
      return checkpoints[account][nCheckpoints - 1].votes;
    }

    // Next check implicit zero balance
    if (checkpoints[account][0].fromBlock > blockNumber) {
      return 0;
    }

    uint32 lower = 0;
    uint32 upper = nCheckpoints - 1;
    while (upper > lower) {
      uint32 center = upper - (upper - lower) / 2; // ceil, avoiding overflow
      Checkpoint memory cp = checkpoints[account][center];
      if (cp.fromBlock == blockNumber) {
        return cp.votes;
      } else if (cp.fromBlock < blockNumber) {
        lower = center;
      } else {
        upper = center - 1;
      }
    }
    return checkpoints[account][lower].votes;
  }

  function _delegate(address delegator, address delegatee) internal {
    address currentDelegate = _delegates[delegator];
    uint256 delegatorBalance = balanceOf(delegator); // balance of underlying (not scaled);
    _delegates[delegator] = delegatee;

    emit DelegateChanged(delegator, currentDelegate, delegatee);

    _moveDelegates(currentDelegate, delegatee, delegatorBalance);
  }

  function _moveDelegates(
    address srcRep,
    address dstRep,
    uint256 amount
  ) internal {
    if (srcRep != dstRep && amount > 0) {
      if (srcRep != address(0)) {
        // decrease old representative
        uint32 srcRepNum = numCheckpoints[srcRep];
        uint256 srcRepOld = srcRepNum > 0
          ? checkpoints[srcRep][srcRepNum - 1].votes
          : 0;
        uint256 srcRepNew = srcRepOld - amount;
        _writeCheckpoint(srcRep, srcRepNum, srcRepOld, srcRepNew);
      }

      if (dstRep != address(0)) {
        // increase new representative
        uint32 dstRepNum = numCheckpoints[dstRep];
        uint256 dstRepOld = dstRepNum > 0
          ? checkpoints[dstRep][dstRepNum - 1].votes
          : 0;
        uint256 dstRepNew = dstRepOld + amount;
        _writeCheckpoint(dstRep, dstRepNum, dstRepOld, dstRepNew);
      }
    }
  }

  function _writeCheckpoint(
    address delegatee,
    uint32 nCheckpoints,
    uint256 oldVotes,
    uint256 newVotes
  ) internal {
    uint32 blockNumber = safe32(
      block.number,
      "_writeCheckpoint: block number exceeds 32 bits"
    );

    if (
      nCheckpoints > 0 &&
      checkpoints[delegatee][nCheckpoints - 1].fromBlock == blockNumber
    ) {
      checkpoints[delegatee][nCheckpoints - 1].votes = newVotes;
    } else {
      checkpoints[delegatee][nCheckpoints] = Checkpoint(blockNumber, newVotes);
      numCheckpoints[delegatee] = nCheckpoints + 1;
    }

    emit DelegateVotesChanged(delegatee, oldVotes, newVotes);
  }

  function safe32(uint256 n, string memory errorMessage)
    internal
    pure
    returns (uint32)
  {
    require(n < 2**32, errorMessage);
    return uint32(n);
  }

  function getChainId() internal view returns (uint256) {
    uint256 chainId;
    assembly {
      chainId := chainid()
    }
    return chainId;
  }

  function _move(
    address operator,
    address from,
    address to,
    uint256 amount,
    bytes memory userData,
    bytes memory operatorData
  ) internal virtual override {
    super._beforeTokenTransfer(operator, from, to, amount);

    uint256 fromBalance = _balances[from];
    require(fromBalance >= amount, "ERC777: transfer amount exceeds balance");
    unchecked {
      _balances[from] = fromBalance - amount;
    }
    _balances[to] += amount;

    emit Sent(operator, from, to, amount, userData, operatorData);
    emit Transfer(from, to, amount);

    _moveDelegates(address(0), _delegates[to], amount);
  }
}
