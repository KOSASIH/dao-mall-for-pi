const { expect } = require('chai');
const { web3 } = require('@openzeppelin/test-helpers');
const { BN } = web3.utils;

const Escrow = artifacts.require('Escrow');
const AdvancedToken = artifacts.require('AdvancedToken');

contract('Escrow', ([owner, user1, user2]) => {
  let escrow;
  let token;

  beforeEach(async () => {
    token = await AdvancedToken.new({ from: owner });
    escrow = await Escrow.new({ from: owner });
  });

  it('should allow escrow creation', async () => {
    await escrow.createEscrow(user1, user2, 100, 300, { from: owner });
    expect(await escrow.getEscrowCount()).to.be.bignumber.equal(new BN('1'));
  });

  it('should allow escrow release', async () => {
    await escrow.createEscrow(user1, user2, 100, 300, { from: owner });
    await escrow.releaseEscrow(1, { from: user1 });
    expect(await token.balanceOf(user2)).to.be.bignumber.equal(new BN('100'));
  });

  it('should allow escrow refund', async () => {
    await escrow.createEscrow(user1, user2, 100, 300, { from: owner });
    await escrow.refundEscrow(1, { from: user1 });
    expect(await token.balanceOf(user1)).to.be.bignumber.equal(new BN('100'));
  });
});
