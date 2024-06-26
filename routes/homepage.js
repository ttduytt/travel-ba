const express = require('express');
const router = express.Router();
const homepageController = require('../controller/homepageController');

router.get('/homepage', homepageController.renderHome)

module.exports =router