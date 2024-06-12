const Web3 = require('web3');
const EthereumProvider = require('./EthereumProvider');
const BinanceSmartChainProvider = require('./BinanceSmartChainProvider');
const PolygonProvider = require('./PolygonProvider');

class BlockchainIntegration {
  async integrateWithEthereum() {
    const ethereumProvider = new EthereumProvider();
    await ethereumProvider.integrate();
  }

  async integrateWithBinanceSmartChain() {
    const binanceSmartChainProvider = new BinanceSmartChainProvider();
    await binanceSmartChainProvider.integrate();
  }

  async integrateWithPolygon() {
    const polygonProvider = new PolygonProvider();
    await polygonProvider.integrate();
  }
}

module.exports = BlockchainIntegration;
