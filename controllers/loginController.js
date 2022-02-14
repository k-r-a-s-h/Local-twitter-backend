const userSchema = require('../models/user');
const jwt = require('jsonwebtoken')

const loginController = async(req,res,next)=>{
    try{
        // console.log(req.body)
        let user = await userSchema.findOne({email:req.body.email})
        if(!user){
            res.status(401).json({status:'Invalid Email-id or password'})
        }
        else{
            let isMatch = await user.validatePassword(req.body.password)
            if(isMatch) {
                let token = jwt.sign({
                    email:user.email,
                    userid: user._id
                },process.env.JWT_SECRET,{expiresIn : '4hr'})
                res.status(200).json({ token: token, userDetail : {firstName: user.firstName , lastName : user.lastName }})
            }
            else {
                res.status(401).json({status:'Invalid Email-id or password'})
            }
        }
    }
    catch(error){
        next(error)
    } 
}

module.exports={
    loginController
}