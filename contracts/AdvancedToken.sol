pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract AdvancedToken is ERC20 {
    address public owner;
    uint256 public totalSupply;
    uint256 public vestingPeriod;
    uint256 public mintingCap;

    mapping (address => uint256) public balances;
    mapping (address => uint256) public vestingAmounts;
    mapping (address => uint256) public mintingAmounts;

    constructor() public {
        owner = msg.sender;
        totalSupply = 1000000 * (10 ** 18); // 1 million tokens with 18 decimals
        vestingPeriod = 365 days; // 1 year vesting period
        mintingCap = 500000 * (10 ** 18); // 500,000 tokens minting cap
    }

    function vestTokens(address _beneficiary, uint256 _amount) public onlyOwner {
        require(_amount <= totalSupply, "Insufficient tokens");
        balances[_beneficiary] += _amount;
        vestingAmounts[_beneficiary] += _amount;
        emit Vesting(_beneficiary, _amount);
    }

    function mintTokens(address _beneficiary, uint256 _amount) public onlyOwner {
        require(_amount <= mintingCap, "Minting cap exceeded");
        balances[_beneficiary] += _amount;
        mintingAmounts[_beneficiary] += _amount;
        emit Minting(_beneficiary, _amount);
    }

    function claimVestedTokens() public {
        uint256 vestedAmount = vestingAmounts[msg.sender];
        require(vestedAmount > 0, "No vested tokens");
        balances[msg.sender] += vestedAmount;
        vestingAmounts[msg.sender] = 0;
        emit ClaimVesting(msg.sender, vestedAmount);
    }

    function transfer(address _recipient, uint256 _amount) public override {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_recipient] += _amount;
        emit Transfer(msg.sender, _recipient, _amount);
    }

    event Vesting(address indexed beneficiary, uint256 amount);
    event Minting(address indexed beneficiary, uint256 amount);
    event ClaimVesting(address indexed beneficiary, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
}
