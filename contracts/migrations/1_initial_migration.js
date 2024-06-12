const { deployer, web3 } = require('@openzeppelin/truffle-deployer');
const { BN } = web3.utils;

const AdvancedToken = artifacts.require('AdvancedToken');
const Governance = artifacts.require('Governance');
const AdvancedNFT = artifacts.require('AdvancedNFT');

module.exports = async function (deployer) {
  // Set the deployer's account as the owner of the contracts
  const owner = deployer.provider.address;

  // Deploy the AdvancedToken contract
  await deployer.deploy(AdvancedToken, {
    from: owner,
    gas: 5000000,
    gasPrice: new BN('20000000000'),
  });

  // Deploy the Governance contract
  await deployer.deploy(Governance, {
    from: owner,
    gas: 5000000,
    gasPrice: new BN('20000000000'),
  });

  // Deploy the AdvancedNFT contract
  await deployer.deploy(AdvancedNFT, {
    from: owner,
    gas: 5000000,
    gasPrice: new BN('20000000000'),
  });

  // Set the AdvancedToken contract as the token used for governance
  await Governance.deployed().then(governance => {
    governance.setToken(AdvancedToken.address, { from: owner });
  });

  // Set the AdvancedNFT contract as the NFT used for auctions
  await Governance.deployed().then(governance => {
    governance.setNFT(AdvancedNFT.address, { from: owner });
  });

  // Initialize the AdvancedToken contract with an initial supply
  await AdvancedToken.deployed().then(token => {
    token.mint(owner, new BN('1000000000000000000000'), { from: owner });
  });

  console.log('Initial migration complete!');
};
