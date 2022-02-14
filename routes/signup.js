const express = require('express');
const { signUpController } = require('../controllers/signUpController');
const { signUpValidation } = require('../middlerware/validations/signupValidation')
const router = express.Router();

router.post('/',signUpValidation,signUpController)

router.all('/',async(req,res,next)=>{
    res.status(501).send()
})

module.exports = router;
