import mongoose from "mongoose";

const Schema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    image: {
        type: String,
        required: true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    link:{
        type:String,
        ref:"User",
        required:true,
    }
})