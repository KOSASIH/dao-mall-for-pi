const { expect } = require('chai');
const { web3 } = require('@openzeppelin/test-helpers');
const { BN } = web3.utils;

const Governance = artifacts.require('Governance');
const AdvancedToken = artifacts.require('AdvancedToken');

contract('Governance', ([owner, user1, user2]) => {
  let governance;
  let token;

  beforeEach(async () => {
    token = await AdvancedToken.new({ from: owner });
    governance = await Governance.new(token.address, { from: owner });
  });

  it('should have a token set', async () => {
    expect(await governance.token()).to.equal(token.address);
  });

  it('should allow proposals', async () => {
    await governance.propose('Test Proposal', 'This is a test proposal.', { from: owner });
    expect(await governance.proposalCount()).to.be.bignumber.equal(new BN('1'));
  });

  it('should allow voting', async () => {
    await governance.propose('Test Proposal', 'This is a test proposal.', { from: owner });
    await governance.vote(1, true, { from: user1 });
    expect(await governance.getVote(1, user1)).to.be.true;
  });

  it('should execute proposals', async () => {
    await governance.propose('Test Proposal', 'This is a test proposal.', { from: owner });
    await governance.executeProposal(1, { from: owner });
    expect(await governance.proposalExecuted(1)).to.be.true;
  });

  it('should emit Proposal events', async () => {
    const tx = await governance.propose('Test Proposal', 'This is a test proposal.', { from: owner });
    expect(tx.logs[0].event).to.equal('Proposal');
    expect(tx.logs[0].args.id).to.be.bignumber.equal(new BN('1'));
    expect(tx.logs[0].args.description).to.equal('This is a test proposal.');
  });
});
