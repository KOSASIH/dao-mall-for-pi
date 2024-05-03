pragma solidity ^0.8.0;

contract DAO {
  struct Proposal {
    uint id;
    string description;
    bool executed;
  }

  Proposal[] public proposals;

  function createProposal(string memory _description) public {
    uint proposalId = proposals.length + 1;
    Proposal memory newProposal = Proposal({
      id: proposalId,
      description: _description,
      executed: false
    });

    proposals.push(newProposal);
  }

  function executeProposal(uint _proposalId) public {
    Proposal storage proposal = proposals[_proposalId];

    if (proposal.executed) {
      revert("Proposal already executed.");
    }

    // Execute the proposal logic here

    proposal.executed = true;
  }
}
