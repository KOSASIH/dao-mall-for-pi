const { expect } = require('chai');
const { web3 } = require('@openzeppelin/test-helpers');
const { BN } = web3.utils;

const Product = artifacts.require('Product');
const AdvancedNFT = artifacts.require('AdvancedNFT');

contract('Product', ([owner, user1, user2]) => {
  let product;
  let nft;

  beforeEach(async () => {
    nft = await AdvancedNFT.new({ from: owner });
    product = await Product.new({ from: owner });
  });

  it('should allow product creation', async () => {
    await product.createProduct('Test Product', 'This is a test product.', 100, 10, nft.address, { from: owner });
    expect(await product.getProductCount()).to.be.bignumber.equal(new BN('1'));
  });

  it('should allow product updates', async () => {
    await product.createProduct('Test Product', 'This is a test product.', 100, 10, nft.address, { from: owner });
    await product.updateProduct(1, 'Updated Test Product', 'This is an updated test product.', 200, 20, { from: owner });
    expect(await product.getProduct(1).name).to.equal('Updated Test Product');
  });

  it('should allow product buying', async () => {
    await product.createProduct('Test Product', 'This is a test product.', 100, 10, nft.address, { from: owner });
    await product.buyProduct(1, 5, { from: user1 });
    expect(await product.getProduct(1).quantity).to.be.bignumber.equal(new BN('5'));
  });
});
