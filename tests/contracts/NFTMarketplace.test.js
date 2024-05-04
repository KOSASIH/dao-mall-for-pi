const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('NFTMarketplace', () => {
  let nftMarketplace
  let owner
  let addr1
  let addr2

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners()

    const NFT = await ethers.getContractFactory('NFT')
    const nft = await NFT.deploy()
    await nft.deployed()

    const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace')
    nftMarketplace = await NFTMarketplace.deploy(nft.address)
    await nftMarketplace.deployed()
  })

  describe('createNFT', () => {
    it('should create an NFT', async () => {
      await nftMarketplace.createNFT(
        'NFT 1',
        'Description 1',
        'https://example.com/image1.png'
      )
      const nft = await nftMarketplace.nfts(1)
      expect(nft.name).to.equal('NFT 1')
      expect(nft.description).to.equal('Description 1')
      expect(nft.image).to.equal('https://example.com/image1.png')
    })
  })

  describe('buyNFT', () => {
    it('should buy an NFT', async () => {
      await nftMarketplace.createNFT(
        'NFT 1',
        'Description 1',
        'https://example.com/image1.png'
      )
      await nftMarketplace
        .connect(addr1)
        .buyNFT(1, { value: ethers.utils.parseEther('0.1') })
      const nft = await nftMarketplace.nfts(1)
      expect(nft.owner).to.equal(addr1.address)
    })
  })
})
