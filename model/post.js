const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Post= new Schema ({
    title:{type: String , maxLength:255},
    category:{type: String , maxLength:255},
    content: {type: String , require:true},
    avatar:{type:String},
    view:{type:Number, default:0},
    createdAt: {type: Date, default:Date.now},
    slug: { type: String, slug: "title", unique: true },
 
},{timestamps:true})

module.exports= mongoose.model ('post', Post)