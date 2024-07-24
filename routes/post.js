const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const middlewareController=require('../controller/middlewareController')

router.post('/get/dynamicSearch', postController.getdynamicSearch)
router.get('/get/sortDown',postController.getPostDown)
router.get('/listPost', postController.getPost)
router.get('/get/:type', postController.getPostType)
router.get('/getOne/:keyword', postController.getOnePost)
router.post('/add', postController.addPost)
router.delete('/delete/:id', postController.deletePost.bind(postController));
router.put('/update/:id',postController.updatePost)
router.put('/updateview/:id',postController.updateView)
router.get ('/suggest/:kind/:id', postController.getSuggestPost)
router.get('/search/:keyword', postController.getPostByKeyWord)

module.exports =router