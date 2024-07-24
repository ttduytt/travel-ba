const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

router.post('/add', categoryController.addcategory)
router.get('/getAll', categoryController.getAllcategory)
router.delete('/delete/:id', categoryController.Deletecategory)

module.exports =router