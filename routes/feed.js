const express = require('express')
const router = express.Router()
const { getFeed } = require('../controllers/feedController')
const { isAuthorized } = require('../middlerware/authMiddlewares') 

router.get('/',isAuthorized,getFeed)

module.exports = router