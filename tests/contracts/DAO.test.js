const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('DAO', () => {
  let dao
  let owner
  let addr1
  let addr2

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners()

    const DAO = await ethers.getContractFactory('DAO')
    dao = await DAO.deploy()
    await dao.deployed()
  })

  describe('createProposal', () => {
    it('should create a proposal', async () => {
      await dao.createProposal('Proposal 1')
      const proposal = await dao.proposals(1)
      expect(proposal.description).to.equal('Proposal 1')
    })
  })

  describe('executeProposal', () => {
    it('should execute a proposal', async () => {
      await dao.createProposal('Proposal 1')
      await dao.executeProposal(1)
      const proposal = await dao.proposals(1)
      expect(proposal.executed).to.equal(true)
    })
  })
})
