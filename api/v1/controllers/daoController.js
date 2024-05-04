const DAO = require('../contracts/DAO/DAO');
const DAOProxy = require('../contracts/DAO/DAOProxy');

exports.getDAOInfo = async (req, res) => {
  try {
    const dao = new DAO(<DAO_ADDRESS>);
    const daoInfo = await dao.methods.getDAOInfo().call();
    res.json(daoInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProposal = async (req, res) => {
  try {
    const daoProxy = new DAOProxy(<DAO_PROXY_ADDRESS>);
    const proposal = await daoProxy.methods.createProposal(req.body).send({ from: req.user.address });
    res.json(proposal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.castVote = async (req, res) => {
  try {
    const daoProxy = new DAOProxy(<DAO_PROXY_ADDRESS>);
    const vote = await daoProxy.methods.castVote(req.body.proposalId, req.body.vote).send({ from: req.user.address });
    res.json(vote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
