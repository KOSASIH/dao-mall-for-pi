const express = require('express');
const router = express.Router();
const daoController = require('../controllers/daoController');

router.get('/', daoController.getDAOInfo);
router.post('/proposal', daoController.createProposal);
router.post('/vote', daoController.castVote);

module.exports = router;
