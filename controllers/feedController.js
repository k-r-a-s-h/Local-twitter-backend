const followerSchema = require('../models/followers')
const postSchema = require('../models/post')
const mongoose = require('mongoose')

const getFeed = async (req,res,next)=>{
    try{
        let currentUser = req.user
        let followers = await followerSchema.find({to:currentUser})
        let followersId = []
        followers.forEach(ele=>{
            followersId.push(ele.by)
        })
        let posts = await postSchema.find({
            "postedBy":{
               "$in" : followersId
            }
        }).populate('postedBy','_id firstName lastName email')
        console.log(posts)
        res.status(200).json({posts:posts})
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    getFeed
}