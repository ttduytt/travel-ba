const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId; // Sử dụng ObjectId từ Schema

const PoinRaiting= new Schema ({
    id_post: {type: ObjectId},
    id_user: {type: ObjectId},
    poinRating:{type:Number},
    content: {type: String , maxLength:255},
    createdAt: {type: Date, default:Date.now}
},{timestamps:true})

module.exports= mongoose.model ('poinRaiting', PoinRaiting)