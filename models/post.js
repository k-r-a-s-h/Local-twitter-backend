const mongoose = require('mongoose')
const {Schema} = mongoose

const postSchema = new Schema({
    content : {type:String,required:true,trim:true},
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps:true})

postSchema.methods.canAccessPost = async function(userid){
    return (userid === this.postedBy.toString())
}

const Post = mongoose.model('Post',postSchema)
module.exports = Post