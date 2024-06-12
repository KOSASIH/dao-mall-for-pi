pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Escrow {
    using SafeERC20 for AdvancedToken;
    using SafeMath for uint256;

    struct EscrowData {
        uint256 id;
        address buyer;
        address seller;
        uint256 amount;
        uint256 deadline;
        bool isReleased;
    }

    mapping (uint256 => EscrowData) public escrows;
    uint256 public escrowCount;

    event EscrowCreated(uint256 id, address buyer, address seller, uint256 amount, uint256 deadline);
    event EscrowReleased(uint256 id, address buyer, address seller, uint256 amount);
    event EscrowRefunded(uint256 id, address buyer, address seller, uint256 amount);

    function createEscrow(address _buyer, address _seller, uint256 _amount, uint256 _deadline) public {
        uint256 _escrowId = escrowCount;
        EscrowData storage escrow = escrows[_escrowId];
        escrow.id = _escrowId;
        escrow.buyer = _buyer;
        escrow.seller = _seller;
        escrow.amount = _amount;
        escrow.deadline = _deadline;
        escrow.isReleased = false;

        escrowCount++;

        emit EscrowCreated(_escrowId, _buyer, _seller, _amount, _deadline);
    }

    function releaseEscrow(uint256 _escrowId) public {
        EscrowData storage escrow = escrows[_escrowId];
        require(escrow.isReleased == false, "Escrow already released");
        require(block.timestamp <= escrow.deadline, "Deadline exceeded");

        // Release funds to seller
        AdvancedToken.transfer(escrow.seller, escrow.amount);

        escrow.isReleased = true;

        emit EscrowReleased(_escrowId, escrow.buyer, escrow.seller, escrow.amount);
    }

    function refundEscrow(uint256 _escrowId) public {
        EscrowData storage escrow = escrows[_escrowId];
        require(escrow.isReleased == false, "Escrow already released");
        require(block.timestamp > escrow.deadline, "Deadline not exceeded");

        // Refund funds to buyer
        AdvancedToken.transfer(escrow.buyer, escrow.amount);

        escrow.isReleased = true;

        emit EscrowRefunded(_escrowId, escrow.buyer, escrow.seller, escrow.amount);
    }
}
