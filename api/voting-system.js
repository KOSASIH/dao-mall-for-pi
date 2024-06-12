const Web3 = require('web3');
const DAOContract = require('./DAOContract');

class VotingSystem {
  async createProposal(proposalTitle, proposalDescription) {
    const daoContract = new DAOContract();
    const proposalId = await daoContract.createProposal(proposalTitle, proposalDescription);
    return proposalId;
  }

  async voteOnProposal(proposalId, voterAddress, vote) {
    const daoContract = new DAOContract();
    await daoContract.voteOnProposal(proposalId, voterAddress, vote);
  }

  async getProposalResults(proposalId) {
    const daoContract = new DAOContract();
    const results = await daoContract.getProposalResults(proposalId);
    return results;
  }
}

module.exports = VotingSystem;
