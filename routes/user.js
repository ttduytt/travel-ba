const express = require('express');
const router = express.Router();
const userController= require('../controller/userController')
const authController =require('../controller/authoController')
const middlewareController=require('../controller/middlewareController')

router.delete('/:id/delete',userController.deleteUser)
router.delete('/:id/block',userController.blockUser)
router.get('/:id/restore',userController.restoreUser)
router.patch('/:id/update',userController.updateUser )
router.post('/add',userController.addUser )
router.get('/list', userController.getUser)
router.get('/Blocklist', userController.getBlockUser)
router.get('/verrify', middlewareController.verifyToken, userController.pushNotification)



module.exports =router