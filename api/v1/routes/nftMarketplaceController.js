const NFTMarketplace = require('../contracts/NFTMarketplace/NFTMarketplace');
const NFT = require('../contracts/NFTMarketplace$@$v=v1.16$@$/NFT');

exports.getMarketplaceInfo = async (req, res) => {
  try {
    const nftMarketplace = new NFTMarketplace(<NFT_MARKETPLACE_ADDRESS>);
    const marketplaceInfo = await nftMarketplace.methods.getMarketplaceInfo().call();
    res.json(marketplaceInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNFT = async (req, res) => {
  try {
    const nft = new NFT(<NFT_ADDRESS>);
    const nftId = await nft.methods.createNFT(req.body.name, req.body.description, req.body.image).send({ from: req.user.address });
    res.json(nftId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buyNFT = async (req, res) => {
  try {
    const nftMarketplace = new NFTMarketplace(<NFT_MARKETPLACE_ADDRESS>);
    const buy = await nftMarketplace.methods.buyNFT(req.body.nftId).send({ from: req.user.address, value: req.body.price });
    res.json(buy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
