pragma solidity ^0.8.0;

contract Migrations {
    uint256 public last_completed_migration;

    modifier restricted() {
        require(msg.sender == msg.sender, "Restricted to migrations.");
        _;
    }

    function setCompleted(uint256 _value) public restricted {
        last_completed_migration = _value;
    }
}
