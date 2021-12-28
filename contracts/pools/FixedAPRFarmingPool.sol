// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../access/Owner.sol";
import "../token/ERC20/interfaces/IERC20.sol";
import "../libraries/SafeMath.sol";


contract FixedAPRFarmingPool is Ownable {
    using SafeMath for uint256;

    uint256 constant SECOND_IN_YEAR = 60*60*24*365;

    IERC20 public STAKING_TOKEN;
    IERC20 public REWARD_TOKEN;
    uint16 public APR;
    uint256 public MIN_INVESTMENT;
    uint256 public MAX_INVESTMENT;
    uint256 public LOCK_DURATION;
    uint256 public START_DATE;
    uint256 public DURATION;

    uint256 public totalBalance;

    mapping(address=>uint256) public balances;
    mapping(address=>uint256) public rewards;
    mapping(address=>uint256) public lastTimeUpdateReward;
    mapping(address=>uint256) public depositedAt;

    constructor(
        address sender,
        address stakingToken,
        address rewardToken,
        uint256 minInvestment,
        uint256 maxInvestment,
        uint256 lockDuration,
        uint256 startDate,
        uint256 duration,
        uint16 apr
    ) {
        STAKING_TOKEN = IERC20(stakingToken);
        REWARD_TOKEN = IERC20(rewardToken);
        APR = apr;
        MIN_INVESTMENT = minInvestment;
        MAX_INVESTMENT = maxInvestment;
        LOCK_DURATION = lockDuration;
        START_DATE = startDate;
        DURATION = duration;
        transferOwnership(sender);
    }

    function earned(address user) public view returns (uint256) {
        if (lastTimeUpdateReward[user] == 0)
            return 0;
        uint256 duration = block.timestamp.sub(lastTimeUpdateReward[user]);
        uint256 generatedReward = balances[user].mul(APR).mul(duration).div(10000).div(SECOND_IN_YEAR);
        return rewards[user].add(generatedReward);
    }

    function _updateReward(address user) internal {
        rewards[user] = earned(user);
        lastTimeUpdateReward[user] = block.timestamp;
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
        require(amount >= MIN_INVESTMENT, "NCSCFarmingPool:Deposit less than min investment");
        if (MAX_INVESTMENT > 0) {
            require(balances[user].add(amount) <= MAX_INVESTMENT, "NCSCFarmingPool:Deposit exceed max investment");
        }
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