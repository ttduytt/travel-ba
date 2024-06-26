const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

router.post('/add', categoryController.addcategory)
router.get('/getAll', categoryController.getAllcategory)

module.exports =router