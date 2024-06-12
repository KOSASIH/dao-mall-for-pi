const Web3 = require('web3');
const DAOContract = require('./DAOContract');

class Analytics {
  async getUserBalance(userAddress) {
    const daoContract = new DAOContract();
    const balance = await daoContract.getUserBalance(userAddress);
    return balance;
  }

  async getTransactionHistory(userAddress) {
    const daoContract = new DAOContract();
    const history = await daoContract.getTransactionHistory(userAddress);
    return history;
  }

  async getPlatformStatistics() {
    const daoContract = new DAOContract();
    const statistics = await daoContract.getPlatformStatistics();
    return statistics;
  }
}

module.exports = Analytics;
