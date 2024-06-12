const Web3 = require('web3');
const DAOContract = require('./DAOContract');

class Marketplace {
  async createListing(productName, productDescription, price) {
    const daoContract = new DAOContract();
    const listingId = await daoContract.createListing(productName, productDescription, price);
    return listingId;
  }

  async buyProduct(listingId, buyerAddress) {
    const daoContract = new DAOContract();
    await daoContract.buyProduct(listingId, buyerAddress);
  }

  async getProductListings() {
    const daoContract = new DAOContract();
    const listings = await daoContract.getProductListings();
    return listings;
  }
}

module.exports = Marketplace;
