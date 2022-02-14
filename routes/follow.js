const express = require('express')
const router = express.Router()
const {createFollower,deleteFollower,getFollowers} = require('../controllers/followerController')
const { isAuthorized } = require('../middlerware/authMiddlewares')

router.get('/',isAuthorized,getFollowers)
router.post('/:id',isAuthorized,createFollower)
router.delete('/:id',isAuthorized,deleteFollower)

module.exports = router
