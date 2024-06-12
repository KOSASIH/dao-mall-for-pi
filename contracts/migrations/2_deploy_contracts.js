const { deployer, web3 } = require('@openzeppelin/truffle-deployer');
const { BN } = web3.utils;

const AdvancedToken = artifacts.require('AdvancedToken');
const Governance = artifacts.require('Governance');
const AdvancedNFT = artifacts.require('AdvancedNFT');

module.exports = async function (deployer) {
  // Set the deployer's account as the owner of the contracts
  const owner = deployer.provider.address;

  // Deploy a new proposal to the Governance contract
  await Governance.deployed().then(governance => {
    governance.propose('Initial Proposal', 'This is an initial proposal for testing purposes.', {
      from: owner,
    });
  });

  // Deploy a new NFT to the AdvancedNFT contract
  await AdvancedNFT.deployed().then(nft => {
    nft.createNFT('Test NFT', 'This is a test NFT for demonstration purposes.', 3, {
      from: owner,
    });
  });

  // Start an auction for the newly created NFT
  await AdvancedNFT.deployed().then(nft => {
    nft.startAuction(1, new BN('1000000000000000000'), {
      from: owner,
    });
  });

  console.log('Contracts deployment complete!');
};
