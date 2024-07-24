const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageLibary= new Schema ({
    title: {type: String , maxLength:255, require, unique:true},
    image:{type:String , require},
    view: {type:Number, default:0},
    like: {type:Number, default:0},
    createdAt: {type: Date, default:Date.now},
},{timestamps:true})

module.exports= mongoose.model ('imageLibary', ImageLibary)