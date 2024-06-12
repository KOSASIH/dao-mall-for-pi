const Web3 = require('web3');
const DAOContract = require('./DAOContract');

class Security {
  async setMultiSigWallet(walletAddress) {
    const daoContract = new DAOContract();
    await daoContract.setMultiSigWallet(walletAddress);
  }

  async rateLimitTransactions() {
    const daoContract = new DAOContract();
    await daoContract.rateLimitTransactions();
  }

  async verifyTransaction(transactionId) {
    const daoContract = new DAOContract();
    const verified = await daoContract.verifyTransaction(transactionId);
    return verified;
  }
}

module.exports = Security;
