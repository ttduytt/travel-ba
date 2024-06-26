const express = require('express')
const router = express.Router();
const authController = require('../controller/authoController')


router.post('/login', authController.login)
router.get('/refresh', authController.requestRefreshToken)

module.exports= router