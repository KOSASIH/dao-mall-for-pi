const { expect } = require('chai');
const { web3 } = require('@openzeppelin/test-helpers');
const { BN } = web3.utils;

const Reputation = artifacts.require('Reputation');

contract('Reputation', ([owner, user1, user2]) => {
  let reputation;

  beforeEach(async () => {
    reputation = await Reputation.new({ from: owner });
  });

  it('should allow voting', async () => {
    await reputation.voteForUser(user1, 10, { from: owner });
    expect(await reputation.getUserReputation(user1)).to.be.bignumber.equal(new BN('10'));
  });

  it('should update reputation scores', async () => {
    await reputation.voteForUser(user1, 10, { from: owner });
    await reputation.voteForUser(user1, 20, { from: user2 });
    expect(await reputation.getUserReputation(user1)).to.be.bignumber.equal(new BN('30'));
  });
});
