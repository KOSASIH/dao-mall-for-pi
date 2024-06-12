pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/access/Ownable.sol";

contract Governance is Ownable {
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 votingDeadline;
        uint256 yesVotes;
        uint256 noVotes;
        bool executed;
    }

    mapping (uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    mapping (address => uint256) public voterWeights;

    event NewProposal(uint256 proposalId, address proposer, string description);
    event VoteCast(address voter, uint256 proposalId, bool inFavor);
    event ProposalExecuted(uint256 proposalId);

    function propose(string memory _description) public onlyOwner {
        proposalCount++;
        Proposal storage proposal = proposals[proposalCount];
        proposal.id = proposalCount;
        proposal.proposer = msg.sender;
        proposal.description = _description;
        proposal.votingDeadline = block.timestamp + 7 days; // 7-day voting period
        emit NewProposal(proposalCount, msg.sender, _description);
    }

    function vote(uint256 _proposalId, bool _inFavor) public {
        require(proposals[_proposalId].votingDeadline > block.timestamp, "Voting period has ended");
        require(voterWeights[msg.sender] > 0, "No voting weight");
        Proposal storage proposal = proposals[_proposalId];
        if (_inFavor) {
            proposal.yesVotes += voterWeights[msg.sender];
        } else {
            proposal.noVotes += voterWeights[msg.sender];
        }
        emit VoteCast(msg.sender, _proposalId, _inFavor);
    }

    function executeProposal(uint256 _proposalId) public onlyOwner {
        require(proposals[_proposalId].votingDeadline <= block.timestamp, "Voting period has not ended");
        require(proposals[_proposalId].yesVotes > proposals[_proposalId].noVotes, "Proposal not approved");
        Proposal storage proposal = proposals[_proposalId];
        proposal.executed = true;
        emit ProposalExecuted(_proposalId);
        // Execute the proposal logic here
    }

    function setVoterWeight(address _voter, uint256 _weight) public onlyOwner {
        voterWeights[_voter] = _weight;
    }
}
