const followSchema = require('../models/followers')

const createFollower = async (req,res,next)=>{
    try{
        let to = req.user
        let by = req.params.id
        let exisitingFollow = await followSchema.findOne({to,by})
        console.log(exisitingFollow)
        if(exisitingFollow){
            res.status(200).json({status:'Already following'})
        }
        else{
            let follower = new followSchema({
                to,
                by
            })
            await follower.save();
            res.status(200).json({status:'Followed Successfully '})
        }
        
    }
    catch(err){
        next(err)
    }
}

const deleteFollower = async (req,res,next)=>{
    try{
        let to = req.user
        let by = req.params.id
        let exisitingFollow = await followSchema.findOne({to,by})
        let canEdit = await exisitingFollow.canAccessFollower(req.user)
        if(canEdit){
            await followSchema.findByIdAndDelete({_id:exisitingFollow._id})
            res.status(200).json({status:'Unfollowed successfully '})
        }
        else{
            res.status(403).json({status : 'Not authorized'})
        }
    }
    catch(err){
        next(err)
    }
}

const getFollowers = async(req,res,next)=>{
    try{
        let to = req.user
        let followers = await followSchema.find({to}).populate('by','_id firstName lastName email')
        let response = []
        followers.forEach(ele=>{
            response.push(ele?.by)
        })
        res.status(200).json({followers : response})
    }
    catch(err){
        next(err)
    }
}

module.exports = {createFollower,deleteFollower,getFollowers}