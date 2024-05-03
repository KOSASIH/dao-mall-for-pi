const express = require('express')
const router = express.Router()
const deFiController = require('../controllers/deFiController')

router.get('/lending', deFiController.getLendingInfo)
router.get('/borrowing', deFiController.getBorrowingInfo)
router.get('/yieldFarming', deFiController.getYieldFarmingInfo)

module.exports = router
