const { expect } = require('chai');
const { web3 } = require('@openzeppelin/test-helpers');
const { BN } = web3.utils;

const DAO = artifacts.require('DAO');
const AdvancedToken = artifacts.require('AdvancedToken');
const Governance = artifacts.require('Governance');

contract('DAO', ([owner, user1, user2]) => {
  let dao;
  let token;
  let governance;

  beforeEach(async () => {
    token = await AdvancedToken.new({ from: owner });
    governance = await Governance.new(token.address, { from: owner });
    dao = await DAO.new(token.address, governance.address, { from: owner });
  });

  it('should allow proposal creation', async () => {
    await dao.createProposal('Test Proposal', 100, 200, { from: owner });
    expect(await dao.proposalCount()).to.be.bignumber.equal(new BN('1'));
  });

  it('should allow voting', async () => {
    await dao.createProposal('Test Proposal', 100, 200, { from: owner });
    await dao.vote(1, true, { from: user1 });
    expect(await dao.proposals(1).votes[user1]).to.be.true;
  });

  it('should allow proposal execution', async () => {
    await dao.createProposal('Test Proposal', 100, 200, { from: owner });
    await dao.executeProposal(1, { from: owner });
    expect(await dao.proposals(1).isActive).to.be.false;
  });
});
