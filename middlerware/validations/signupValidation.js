const { validateAll } = require('../../helpers/validation')
const userSchema = require('../../models/user');
const validateSignUpPayload = async (req,res,next)=>{
    try{
        const payLoad = req.body
        if(!payLoad){
            return res.status(400).json({status:'Payload Missing'})
        }
        else{
            const { isAllValid } = validateAll(payLoad.email,payLoad.password,payLoad.firstName,payLoad.lastName)
            if(!isAllValid){
                return res.status(400).json({status:'Enter valid values for all the fields'})
            }
            else{
                let existingUser = await userSchema.findOne({email:payLoad.email})
                if(existingUser){
                    return res.status(409).json({status:'Email already registered with existing user'})
                }
                next()
            }
        }
    }
    catch(err){
        next(err)
    }
}
module.exports.signUpValidation = validateSignUpPayload