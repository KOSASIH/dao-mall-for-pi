const Web3 = require('web3');
const WalletConnect = require('walletconnect');

class Auth {
  async authenticate() {
    const walletConnect = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true
    });

    const accounts = await walletConnect.enable();
    const account = accounts[0];

    const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID'));

    const userAddress = account.address;
    const userBalance = await web3.eth.getBalance(userAddress);

    return { userAddress, userBalance };
  }
}

module.exports = Auth;
