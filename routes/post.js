const express = require('express')
const {createPost,deletePost, getPost,updatePost} = require('../controllers/postController')
const {isAuthorized} = require('../middlerware/authMiddlewares')
const {isValidId} = require('../middlerware/validations/mongooseIdValidation')
const {postValidation} = require('../middlerware/validations/postValidation')
const router = express.Router();

router.get('/:id', isValidId ,getPost)
router.post('/', isAuthorized , postValidation , createPost)
router.delete('/:id', isAuthorized , isValidId , deletePost)
router.put('/:id', isAuthorized , isValidId , postValidation , updatePost)

module.exports = router