const userScehma = require('../models/user');

const signUpController = async(req,res,next)=>{
    try{
        console.log(req.body)
        let user  = new userScehma({
            ...req.body
        })
        await user.save()
        res.send({status:'user created successfully'})
    }
    catch(error){
        next(error)
    } 
}

module.exports={
    signUpController
}