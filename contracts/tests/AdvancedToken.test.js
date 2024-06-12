const { expect } = require('chai');
const { web3 } = require('@openzeppelin/test-helpers');
const { BN } = web3.utils;

const AdvancedToken = artifacts.require('AdvancedToken');

contract('AdvancedToken', ([owner, user1, user2]) => {
  let token;

  beforeEach(async () => {
    token = await AdvancedToken.new({ from: owner });
  });

  it('should have a name', async () => {
    expect(await token.name()).to.equal('Advanced Token');
  });

  it('should have a symbol', async () => {
    expect(await token.symbol()).to.equal('AT');
  });

  it('should have an initial supply', async () => {
    expect(await token.totalSupply()).to.be.bignumber.equal(new BN('1000000000000000000000'));
  });

  it('should allow minting', async () => {
    await token.mint(user1, new BN('1000000000000000000'), { from: owner });
    expect(await token.balanceOf(user1)).to.be.bignumber.equal(new BN('1000000000000000000'));
  });

  it('should allow burning', async () => {
    await token.burn(new BN('500000000000000000'), { from: owner });
    expect(await token.totalSupply()).to.be.bignumber.equal(new BN('950000000000000000000'));
  });

  it('should allow transfers', async () => {
    await token.transfer(user2, new BN('2000000000000000000'), { from: owner });
    expect(await token.balanceOf(user2)).to.be.bignumber.equal(new BN('2000000000000000000'));
  });

  it('should emit Transfer events', async () => {
    const tx = await token.transfer(user2, new BN('1000000000000000000'), { from: owner });
    expect(tx.logs[0].event).to.equal('Transfer');
    expect(tx.logs[0].args.from).to.equal(owner);
    expect(tx.logs[0].args.to).to.equal(user2);
    expect(tx.logs[0].args.value).to.be.bignumber.equal(new BN('1000000000000000000'));
  });
});
