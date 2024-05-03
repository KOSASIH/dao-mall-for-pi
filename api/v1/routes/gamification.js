const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamificationController');

router.get('/leaderboard', gamificationController.getLeaderboard);
router.post('/reward', gamificationController.grantReward);

module.exports = router;
