const jwt = require('jsonwebtoken')

const auth = async (req,res,next)=>{
    const authHeader = req.get('Authorization')
    if(!authHeader){
        return res.status(401).json({status:'Auth Header missing'})
    }
    const token = authHeader.split(' ')[1]
    let decodedToken;
    try{
        decodedToken = await jwt.verify(token,process.env.JWT_SECRET)
        if(!decodedToken){
            return res.status(401).json({status:'Invalid token'})
        }
        req.user = decodedToken.userid
        next()
    }
    catch(err){
        err.status  = 401
        return next(err)
    }
}

module.exports.isAuthorized = auth