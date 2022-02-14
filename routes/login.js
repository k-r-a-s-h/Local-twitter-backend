const express = require('express');
const router = express.Router();
const {loginController} = require('../controllers/loginController')
const {loginValidation} = require('../middlerware/validations/loginValidation')

router.post('/',loginValidation,loginController)

router.all('/',async(req,res,next)=>{
    res.status(501).send()
})

module.exports = router;
