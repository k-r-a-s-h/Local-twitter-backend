const ObjectId = require('mongoose').Types.ObjectId
const validateMongooseId = async (req,res,next)=>{
    try{
        if(ObjectId.isValid(req.params.id)){
            const id = new ObjectId(req.params.id)
            if(ObjectId.isValid(req.params.id)){
                next()   
            }
            else{
                return res.status(404).json({status:'Invalid id'})
            }
        }
        else{
            return res.status(404).json({status:'Invalid id'})
        }

    }
    catch(err){
        next(err)
    }
}

module.exports.isValidId = validateMongooseId