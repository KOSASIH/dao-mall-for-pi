pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

contract DAOContract {
    address public owner;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() public {
        owner = msg.sender;
    }

    function transfer(address to, uint256 value) public {
        require(balances[msg.sender] >= value, "Insufficient balance");
        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender, to, value);
    }

    function approve(address spender, uint256 value) public {
        allowances[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
    }

    function transferFrom(address from, address to, uint256 value) public {
        require(allowances[from][msg.sender] >= value, "Insufficient allowance");
        require(balances[from] >= value, "Insufficient balance");
        balances[from] -= value;
        balances[to] += value;
        emit Transfer(from, to, value);
    }
}
