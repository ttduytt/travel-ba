const express = require('express')
const router = express.Router();
const authController = require('../controller/authoController')


router.post('/login', authController.login)
router.get('/refresh', authController.requestRefreshToken)
router.get('/logout',authController.logOut)
router.get('/isAdmin',authController.verifyIsAdmin)

module.exports= router