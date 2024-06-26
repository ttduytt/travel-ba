const express = require('express')
const router = express.Router()
const poinRatingController = require('../controller/poinRatingController')
const middlewareController = require('../controller//middlewareController')

router.post('/add',middlewareController.verifyAndUpdate,poinRatingController.createPoinrating)
router.get('/get/Statistics',poinRatingController.statisticsRating)

module.exports =router