const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const middlewareController=require('../controller/middlewareController')

router.post('/get/dynamicSearch', postController.getdynamicSearch)
router.get('/get/sortDown',postController.getPostDown)
router.get('/listPost',middlewareController.verifyTokenAdmin, postController.getPost)
router.get('/get/:type', postController.getPostType)
router.get('/getOne/:keyword', postController.getOnePost)
router.post('/add', postController.addPost)
router.delete('/delete/:id',postController.deletePost)
router.put('/update/:id',postController.updatePost)
router.put('/updateview/:id',postController.updateView)

module.exports =router