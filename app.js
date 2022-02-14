const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')
const config = require('dotenv').config()

//routes import
const signUp = require('./routes/signup')
const login = require('./routes/login')
const post = require('./routes/post')
const follow = require('./routes/follow')
const feed = require('./routes/feed')
const search = require('./routes/search')
//routes import end

//initialize app
const app = express()
const port = process.env.PORT

//middleware setup to express up
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(logger('dev'))
app.use(cors())

// mongodb connection
const connectionString = 'mongodb+srv://'+process.env.DB_USER_NAME+':'+process.env.DB_PASSWORD+''+'@cluster0.zn0tq.mongodb.net/Naukri'
mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true})
.then((response)=>{
    console.log(`Connected to MongoDB`)
    app.listen(port,()=>{console.log(`Connected to port ${port}`)})
})
.catch((err)=>{
    console.log(err)
})

//setup routes
app.use('/api/signup',signUp);
app.use('/api/login',login);
app.use('/api/post',post)
app.use('/api/follow',follow)
app.use('/api/feed',feed)
app.use('/api/user',search)

//error handling route
app.use(function (err, req, res, next) {
    console.error(err)
    res.status(err.status || 500);
    res.json({error:err.message});
});



