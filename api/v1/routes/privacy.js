const express = require('express');
const router = express.Router();
const privacyController = require('../controllers/privacyController');

router.post('/encrypt', privacyController.encryptData);
router.post('/decrypt', privacyController.decryptData);

module.exports = router;
