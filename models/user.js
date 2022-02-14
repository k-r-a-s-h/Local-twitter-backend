const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt')
const SALT_FACTOR = 10

const userSchema = new Schema({
    firstName: { type: String , required: true, trim: true},
    lastName: { type: String , required: true, trim: true},
    email: { type: String , required: true, trim: true, index: { unique: true }},
    password: {type: String, required: true} ,
    // company : {type : String,required:true}
},{timestamps:true})

userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
      const salt=await bcrypt.genSalt(SALT_FACTOR)
      const hsh=await bcrypt.hash(user.password,salt)
      user.password=hsh
    }
    next()
})

userSchema.methods.validatePassword = async function validatePassword(data){
    return bcrypt.compare(data,this.password)
}

const user = mongoose.model('User',userSchema)

module.exports = user
