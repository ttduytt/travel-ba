const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const PendingPost= new Schema ({
    kindService:{type:String},
    name:{type: String , maxLength:255},
    location:{type: String , maxLength:255},
    number: {type: String ,maxLength:11, require:true},
    email:{type:String,require:true},
    img:{type:Array},
    introduce:{type:String,require:true},
    accept:{type:Boolean, default:false},
    view: {type:Number, default:0},
    like: {type:Number, default:0},
    createdAt: {type: Date, default:Date.now},

},{timestamps:true})

module.exports= mongoose.model ('pendingPost', PendingPost)