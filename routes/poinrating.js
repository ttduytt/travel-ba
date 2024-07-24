const express = require('express')
const router = express.Router()
const poinRatingController = require('../controller/poinRatingController')
const middlewareController = require('../controller//middlewareController')

router.post('/add',middlewareController.verifyAndUpdate,poinRatingController.createPoinrating)
router.get('/get/Statistics',poinRatingController.statisticsRating)
router.get('/get/all/:id',poinRatingController.getAllRating)
router.delete('/delete/:id',poinRatingController.deleteRating)
router.get('/get/allwithLogin/:id',middlewareController.verifyToken, poinRatingController.getAllRatingWithLogin)

module.exports =router
