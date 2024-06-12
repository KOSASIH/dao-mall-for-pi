const Web3 = require('web3');
const DAOContract = require('./DAOContract');

class Governance {
  async proposeChange(proposalTitle, proposalDescription) {
    const daoContract = new DAOContract();
    const proposalId = await daoContract.proposeChange(proposalTitle, proposalDescription);
    return proposalId;
  }

  async voteOnChange(proposalId, voterAddress, vote) {
    const daoContract = new DAOContract();
    await daoContract.voteOnChange(proposalId, voterAddress, vote);
  }

  async getChangeResults(proposalId) {
    const daoContract = new DAOContract();
    const results = await daoContract.getChangeResults(proposalId);
    return results;
  }
}

module.exports = Governance;
