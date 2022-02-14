const postSchema = require('../models/post')

const getPost = async(req,res,next)=>{
    try{
        let post = await postSchema.findById({_id:req.params.id}).populate('postedBy','firstName lastName email')
        if(!post){
            let error = new Error('No post with id found')
            error.status = 404
            throw error
        }
        else{
            res.status(200).json(post)
        }
    }
    catch(err){
        next(err)
    }
}
const createPost = async(req,res,next)=>{
    try{
        let post = new postSchema({
            content : req.body.content,
            postedBy : req.user
        })
        await post.save();
        res.status(200).json({
            id : post._id,
            status : "Post Created Successfully"
        })
    }
    catch(err){
        next(err);
    }
}
const updatePost = async(req,res,next)=>{
    try{
        let id = req.params.id
        let content  = req.body.content
        let userId = req.user
        let post = await postSchema.findById({_id:id})
        if(!post){
            let error = new Error('No post with id found')
            error.status = 404
            throw error
        }
        else{
            let canAccessPost = await post.canAccessPost(userId)
            if(canAccessPost){
                await postSchema.findByIdAndUpdate(id,{content:content})
                res.status(200).json({status:'Post Updated Sucessfully'})
            }
            else{
                res.status(403).json({status : 'Not authorized'})
            }
        }
    }
    catch(err){
        next(err)
    }
}
const deletePost = async(req,res,next)=>{
    try{
        let id = req.params.id
        let userId = req.user
        let post = await postSchema.findById({_id:id})
        if(!post){
            let error = new Error('No post with id found')
            error.status = 404
            throw error
        }
        else{
            let canDelete = await post.canAccessPost(userId)
            if(canDelete){
                await postSchema.findByIdAndDelete({_id:id})
                res.status(200).json({status:"Post deleted successfully"})
            }
            else{
                res.status(403).json({status : 'Not authorized'})
            }
        }
    }
    catch(err){
        next(err)
    }
}
module.exports = {
    createPost,
    deletePost,
    getPost,
    updatePost
}