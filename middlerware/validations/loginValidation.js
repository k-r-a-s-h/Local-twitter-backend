const {validateEmail,validatePassword} = require('../../helpers/validation')
const validateLoginPayload = (req,res,next)=>{
    try{
        const payLoad  = req.body
        if(!payLoad){
            return res.status(400).json({status:'Email id and password is required'})
        }
        else{
            const isValidEmail = validateEmail(req.body.email)
            const isValidPassword = validatePassword(req.body.password)

            if(!isValidEmail || !isValidPassword){
                return res.status(400).json({status:'Enter valid values for email and password'})
            }
            else{
                next()
            }
        }
    }
    catch(err){
        return next(err)
    }
    
}

module.exports.loginValidation = validateLoginPayload