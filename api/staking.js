const Web3 = require('web3');
const DAOContract = require('./DAOContract');

class Staking {
  async stakeTokens(stakerAddress, amount) {
    const daoContract = new DAOContract();
    await daoContract.stakeTokens(stakerAddress, amount);
  }

  async unstakeTokens(stakerAddress, amount) {
    const daoContract = new DAOContract();
    await daoContract.unstakeTokens(stakerAddress, amount);
  }

  async getStakerRewards(stakerAddress) {
    const daoContract = new DAOContract();
    const rewards = await daoContract.getStakerRewards(stakerAddress);
    return rewards;
  }
}

module.exports = Staking;
