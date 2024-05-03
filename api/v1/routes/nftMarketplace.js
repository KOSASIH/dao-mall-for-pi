const express = require('express')
const router = express.Router()
const nftMarketplaceController = require('../controllers/nftMarketplaceController')

router.get('/', nftMarketplaceController.getMarketplaceInfo)
router.post('/create', nftMarketplaceController.createNFT)
router.post('/buy', nftMarketplaceController.buyNFT)

module.exports = router
