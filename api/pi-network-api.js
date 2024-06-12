const axios = require('axios');

class PiNetworkAPI {
  async getUserBalance(piAddress) {
    const response = await axios.get(`https://api.pi.network/v1/users/${piAddress}/balance`);
    return response.data.balance;
  }

  async transferPiTokens(piAddress, toAddress, amount) {
    const response = await axios.post(`https://api.pi.network/v1/users/${piAddress}/transfer`, {
      to: toAddress,
      amount: amount
    });
    return response.data.transactionId;
  }
}

module.exports = PiNetworkAPI;
