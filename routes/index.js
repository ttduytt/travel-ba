 const homepage = require ('./homepage')
 const post= require ('./post')
 const user= require('./user')
 const category= require('./category')
 const auth = require('./auth')
 const poinrating  = require('./poinrating')
 const image = require('./image')
 const pendingPost=require('./pendingPost')
 function routes (app) {
    app.use('/', homepage)
    app.use('/post',post)
    app.use('/user',user)
    app.use('/category',category)
    app.use('/auth',auth)
    app.use('/poinRating', poinrating)
    app.use('/image', image)
    app.use('/pendingPost', pendingPost)
 }

module.exports = routes