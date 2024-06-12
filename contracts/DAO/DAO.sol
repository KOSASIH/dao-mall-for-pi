pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./AdvancedToken.sol";
import "./Governance.sol";

contract DAO {
    using SafeERC20 for AdvancedToken;
    using SafeMath for uint256;

    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 amount;
        uint256 deadline;
        bool isActive;
        mapping (address => bool) votes;
    }

    AdvancedToken public tokenContract;
    Governance public governanceContract;
    mapping (uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    event ProposalCreated(uint256 id, address proposer, string description, uint256 amount, uint256 deadline);
    event ProposalVoted(uint256 id, address voter, bool vote);
    event ProposalExecuted(uint256 id);

    constructor(address _tokenContract, address _governanceContract) public {
        tokenContract = AdvancedToken(_tokenContract);
        governanceContract = Governance(_governanceContract);
    }

    function createProposal(string memory _description, uint256 _amount, uint256 _deadline) public {
        require(_deadline > block.timestamp, "Invalid deadline");

        uint256 _proposalId = proposalCount;
        Proposal memory newProposal = Proposal(
            _proposalId,
            msg.sender,
            _description,
            _amount,
            _deadline,
            true,
            mapping(address => false)
        );

        proposals[_proposalId] = newProposal;
        proposalCount++;

        emit ProposalCreated(_proposalId, msg.sender, _description, _amount, _deadline);
    }

    function vote(uint256 _proposalId, bool _vote) public {
        require(_proposalId < proposalCount, "Invalid proposal ID");
        require(proposals[_proposalId].isActive, "Proposal is not active");
        require(!proposals[_proposalId].votes[msg.sender], "Already voted");

        proposals[_proposalId].votes[msg.sender] = true;

        emit ProposalVoted(_proposalId, msg.sender, _vote);
    }

    function executeProposal(uint256 _proposalId) public {
        require(_proposalId < proposalCount, "Invalid proposal ID");
        require(proposals[_proposalId].isActive, "Proposal is not active");
        require(block.timestamp >= proposals[_proposalId].deadline, "Proposal has not reached deadline");

        // Transfer tokens
        tokenContract.transferFrom(msg.sender, address(governanceContract), proposals[_proposalId].amount);

        // Execute proposal
        governanceContract.executeProposal(_proposalId);

        // Update proposal status
        proposals[_proposalId].isActive = false;

        emit ProposalExecuted(_proposalId);
    }
}
