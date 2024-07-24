const express = require('express');
const router = express.Router();
const imageController = require('../controller/imageController');

router.post('/add', imageController.addimage)
router.get('/getAll', imageController.getAllimage)
router.put('/updateLike/:id', imageController.UpdateLike)
router.delete('/delete/:id', imageController.deleteImage)

module.exports =router