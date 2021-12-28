// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../access/Owner.sol";
import "../token/ERC20/interfaces/IERC20.sol";
import "../libraries/SafeMath.sol";


contract BlockRewardFarmingPool is Ownable {
    using SafeMath for uint256;

    uint256 constant SECOND_IN_YEAR = 60*60*24*365;
    uint256 constant AVERAGE_BLOCK_DURATION = 3;

    IERC20 public STAKING_TOKEN;
    IERC20 public REWARD_TOKEN;
    uint256 public REWARD_PER_BLOCK;
    uint256 public LOCK_DURATION;
    uint256 public START_DATE;
    uint256 public DURATION;

    uint256 public totalBalance;
    uint256 public rewardPerTokenStored;
    uint256 public lastUpdateBlock;

    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address=>uint256) public balances;
    mapping(address=>uint256) public rewards;
    mapping(address=>uint256) public lastTimeUpdateReward;
    mapping(address=>uint256) public depositedAt;

    constructor(
        address sender,
        address stakingToken,
        address rewardToken,
        uint256 lockDuration,
        uint256 startDate,
        uint256 duration,
        uint256 rewardPerBlock
    ) {
        STAKING_TOKEN = IERC20(stakingToken);
        REWARD_TOKEN = IERC20(rewardToken);
        LOCK_DURATION = lockDuration;
        START_DATE = startDate;
        DURATION = duration;
        REWARD_PER_BLOCK = rewardPerBlock;
        transferOwnership(sender);
    }

    function apr() public view returns (uint256) {
        return REWARD_PER_BLOCK
            .mul(SECOND_IN_YEAR)
            .div(totalBalance)
            .div(AVERAGE_BLOCK_DURATION);
    }

    function earned(address user) public view returns (uint256) {
        uint256 generatedReward = balances[user].mul(
            _rewardPerToken()
            .sub(userRewardPerTokenPaid[user])
        ).div(1e18);
        return rewards[user].add(generatedReward);
    }

    function _updateReward(address user) internal {
        rewardPerTokenStored = _rewardPerToken();
        lastUpdateBlock = block.number;
        if (user != address(0)) {
            rewards[user] = earned(user);
            userRewardPerTokenPaid[user] = rewardPerTokenStored;
        }
    }

    function _rewardPerToken() public view returns (uint256) {
        if (totalBalance == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored.add(
            block.number
            .sub(lastUpdateBlock)
            .mul(REWARD_PER_BLOCK)
            .mul(1e18)
            .div(totalBalance)
        );
    }

    function deposit(uint256 amount) external {
        _updateReward(msg.sender);
        _deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        _updateReward(msg.sender);
        _withdraw(msg.sender, amount);
    }

    function withdrawAll() external {
        _updateReward(msg.sender);
        uint256 reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        REWARD_TOKEN.transfer(msg.sender, reward);
        
        uint256 userBalance = balances[msg.sender];
        _withdraw(msg.sender, userBalance);
        
        lastTimeUpdateReward[msg.sender] = 0;
    }

    function claim() external {
        _updateReward(msg.sender);
        uint256 reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        REWARD_TOKEN.transfer(msg.sender, reward);
    }

    function _withdraw(address user, uint256 amount) private {
        require(amount <= balances[user], "NCSCFarmingPool:Withdraw exceed balance");
        require(block.timestamp > depositedAt[user].add(LOCK_DURATION), "NCSCFarmingPool:Withdraw still locked");
        STAKING_TOKEN.transfer(user, amount);
        balances[user] = balances[user].sub(amount);
        totalBalance = totalBalance.sub(amount);
    }

    function _deposit(address user, uint256 amount) private {
        if (START_DATE > 0) {
            require(block.timestamp > START_DATE, "NCSCFarmingPool:Not start yet");
            if (DURATION > 0) {
                require(block.timestamp < START_DATE.add(DURATION), "NCSCFarmingPool:Pool is over");
            }
        }
        STAKING_TOKEN.transferFrom(user, address(this), amount);
        balances[user] = balances[user].add(amount);
        totalBalance = totalBalance.add(amount);
        depositedAt[user] = block.timestamp;
    }
}