const postValidation = (req,res,next)=>{
    try{
        const payLoad = req.body
        if(!payLoad){
            return res.status(400).json({status:"Payload Missing"})
        }
        else{
            if(!payLoad.content){
                return res.status(400).json({status:"Content is required"})
            }
            else{
                next()
            }
        }
    }
    catch(err){
        next(err)
    }   
}

module.exports.postValidation = postValidation