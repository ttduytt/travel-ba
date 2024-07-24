const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');


const User= new Schema ({
    username: {type: String , maxLength:255, unique:true, minlength:6},
    password: {type: String, maxLength:600, require:true, minlength:6},
    image: {type: String, maxLength:255, default:'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'},
    name:{type: String, maxLength:255},
    admin:{type:Boolean, default:false},
    refreshtoken:{type:String, default:''}
},{timestamps:true})

// Thêm plugin mongoose-delete vào schema
User.plugin(mongooseDelete,{ deletedAt: true,overrideMethods: ['delete', 'restore'] })

module.exports= mongoose.model ('user', User)