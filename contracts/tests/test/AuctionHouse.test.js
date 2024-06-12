const { expect } = require('chai');
const { web3 } = require('@openzeppelin/test-helpers');
const { BN } = web3.utils;

const AuctionHouse = artifacts.require('AuctionHouse');
const AdvancedNFT = artifacts.require('AdvancedNFT');

contract('AuctionHouse', ([owner, user1, user2]) => {
  let auctionHouse;
  let nft;

  beforeEach(async () => {
    nft = await AdvancedNFT.new({ from: owner });
    auctionHouse = await AuctionHouse.new(nft.address, { from: owner });
  });

  it('should allow auction creation', async () => {
    await auctionHouse.createAuction(1, 100, 200, 300, { from: owner });
    expect(await auctionHouse.auctionCount()).to.be.bignumber.equal(new BN('1'));
  });

  it('should allow bidding', async () => {
    await auctionHouse.createAuction(1, 100, 200, 300, { from: owner });
    await auctionHouse.bid(1, 150, { from: user1 });
    expect(await auctionHouse.auctions(1).endingPrice).to.be.bignumber.equal(new BN('150'));
  });

  it('should allow auction ending', async () => {
    await auctionHouse.createAuction(1, 100, 200, 300, { from: owner });
    await auctionHouse.endAuction(1, { from: owner });
    expect(await auctionHouse.auctions(1).isActive).to.be.false;
  });
});
