const UserSchema =  require('../models/user')
const url = require('url')
const getSearchResults = async (req,res,next)=>{
    try{
        let queryString = url.parse(req.url,true).query
        if(queryString.q){
            let regexForSearch = new RegExp(queryString?.q,'i')
            let searchResult = await UserSchema.find({
                $and:[{$or :[ { 'firstName': { $regex: regexForSearch }},
                                { 'lastName': { $regex: regexForSearch }},
                                {'email':{$regex: regexForSearch}}]},
                    {'_id': {$ne:req.user}}
                    ]
            },{password:0})
            res.json({results:searchResult})
        }
        else{
            res.status(400).json({status:'query string cannot be empty'})
        }
        
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    getSearchResults
}