const express = require('express');
const router = express.Router();
const pendingPostController = require('../controller/pendingPostController');

router.post('/add', pendingPostController.addPendingPost)
router.get('/getPendingPost/notAccept', pendingPostController.getPendingPostNotAccept)
router.get('/getPendingPost/Accept', pendingPostController.getPendingPostAccept)
router.get('/getOne/:id', pendingPostController.getOnePendingPost)
router.get('/forUser/getbyType/:type', pendingPostController.getPendingPostByType)
router.delete('/delete/:id', pendingPostController.refusePendingPost)
router.delete('/deleteService/:id', pendingPostController.deleteService)
router.put('/acceptPendingPost/:id', pendingPostController.acceptPendingPost)
router.put('/updateview/:id', pendingPostController.updateView)
router.put('/updatelike/:id', pendingPostController.updateLike)

module.exports =router