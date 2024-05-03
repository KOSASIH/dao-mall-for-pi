pragma solidity ^0.8.0;

import "./DAO.sol";

contract DAOProxy {
  DAO public dao;

  constructor(address _daoAddress) {
    dao = DAO(_daoAddress);
  }

  function createProposal(string memory _description) public {
    dao.createProposal(_description);
  }

  function executeProposal(uint _proposalId) public {
    dao.executeProposal(_proposalId);
  }
}
