const express = require('express')
const router = express.Router()
const {getSearchResults} = require('../controllers/searchController')
const { isAuthorized } = require('../middlerware/authMiddlewares')

router.get('/',isAuthorized,getSearchResults)

module.exports = router