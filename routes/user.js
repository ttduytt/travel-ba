const express = require('express');
const router = express.Router();
const userController= require('../controller/userController')


router.delete('/:id/delete',userController.deleteUser)
router.delete('/:id/block',userController.blockUser)
router.get('/:id/restore',userController.restoreUser)
router.patch('/:id/update',userController.updateUser )
router.post('/add',userController.addUser )
router.get('/list', userController.getUser)
router.get('/Blocklist', userController.getBlockUser)



module.exports =router