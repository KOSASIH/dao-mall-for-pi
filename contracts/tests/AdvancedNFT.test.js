const { expect } = require('chai');
const { web3 } = require('@openzeppelin/test-helpers');
const { BN } = web3.utils;

const AdvancedNFT = artifacts.require('AdvancedNFT');

contract('AdvancedNFT', ([owner, user1, user2]) => {
  let nft;

  beforeEach(async () => {
    nft = await AdvancedNFT.new({ from: owner });
  });

  it('should have a name', async () => {
    expect(await nft.name()).to.equal('Advanced NFT');
  });

  it('should have a symbol', async () => {
    expect(await nft.symbol()).to.equal('ANFT');
  });

  it('should allow NFT creation', async () => {
    await nft.createNFT('Test NFT', 'This is a test NFT.', 3, { from: owner });
    expect(await nft.balanceOf(owner)).to.be.bignumber.equal(new BN('1'));
  });

  it('should allow NFT transfers', async () => {
    await nft.createNFT('Test NFT', 'This is a test NFT.', 3, { from: owner });
    await nft.transfer(user2, 1, { from: owner });
    expect(await nft.balanceOf(user2)).to.be.bignumber.equal(new BN('1'));
  });

  it('should allow auction creation', async () => {
    await nft.createNFT('Test NFT', 'This is a test NFT.', 3, { from: owner });
    await nft.startAuction(1, new BN('1000000000000000000'), { from: owner });
    expect(await nft.auctionExists(1)).to.be.true;
  });

  it('should emit NFT events', async () => {
    const tx = await nft.createNFT('Test NFT', 'This is a test NFT.', 3, { from: owner });
    expect(tx.logs[0].event).to.equal('NFTCreated');
    expect(tx.logs[0].args.id).to.be.bignumber.equal(new BN('1'));
    expect(tx.logs[0].args.name).to.equal('Test NFT');
    expect(tx.logs[0].args.description).to.equal('This is a test NFT.');
  });
});
