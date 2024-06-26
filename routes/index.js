 const homepage = require ('./homepage')
 const post= require ('./post')
 const user= require('./user')
 const category= require('./category')
 const auth = require('./auth')
 const poinrating  = require('./poinrating')
 function routes (app) {
    app.use('/', homepage)
    app.use('/post',post)
    app.use('/user',user)
    app.use('/category',category)
    app.use('/auth',auth)
    app.use('/poinRating', poinrating)
 }

module.exports = routes