const Web3 = require('web3');
const NFTContract = require('./NFTContract');

class NFT {
  async createNFT(nftName, nftDescription, nftImage) {
    const nftContract = new NFTContract();
    const nftId = await nftContract.createNFT(nftName, nftDescription, nftImage);
    return nftId;
  }

  async buyNFT(nftId, buyerAddress) {
    const nftContract = new NFTContract();
    await nftContract.buyNFT(nftId, buyerAddress);
  }

  async getNFTListings() {
    const nftContract = new NFTContract();
    const listings = await nftContract.getNFTListings();
    return listings;
  }
}

module.exports = NFT;
