const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Category= new Schema ({
    category: {type: String , maxLength:255, require, unique:true},
    createdAt: {type: Date, default:Date.now},
},{timestamps:true})

module.exports= mongoose.model ('category', Category)