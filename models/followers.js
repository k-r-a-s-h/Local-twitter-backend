const mongoose = require('mongoose')
const {Schema} = mongoose

const followerSchema = new Schema({
    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
})

followerSchema.index({to:1,by:1},{unique:true})

followerSchema.methods.canAccessFollower = async function(userid){
    return this.to.toString() === userid
}
const Follower = mongoose.model('Follower',followerSchema)
module.exports = Follower