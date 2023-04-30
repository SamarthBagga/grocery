import mongoose from "mongoose";
import Item from "../models/Item"
import User from "../models/User";

export const getAllItems=async(req,res,next)=>{
    let items;
    try{
        items=await Item.find().populate('user');
    }catch(err){
        return console.log(err) 
    }
    if(!items){
        return res.status(404).json({message:"No items found"});
    }
    return res.status(200).json({items})
}

export const addItem=async(req,res,next)=>{
    const {title,price,image,user,link}=req.body;
    let existingUser;
    try{
        existingUser=await User.findById(user);
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message:"Unabel to find user by this id"})
    }
    const item= new Item({
        title,
        price,
        image,
        user,
        link,
    });
    try{
       const session=await mongoose.startSession();
       session.startTransaction();
       await item.save({session});
       existingUser.items.push(item);
       await existingUser.save({session})
       await session.commitTransaction();
    }catch(err){
        return res.status(500).json({message:err})
    }
    return res.status(200).json({item})
};

export const getById=async(req,res,next)=>{
    const id=req.params.id;
    let item;
    try{
        item=Item.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!item){
        return res.status(404).json({message:"no item found"})
    }
    return res.status(200).json({item});
}

export const deleteItem=async (req,res,next)=>{
    const id=req.params.id;

    let item;
    try{
        item=await Item.findByIdAndRemove(id).populate('user');
        await item.user.items.pull(item);
        await item.user.save();
    }catch(err){
        console.log(err);
    }
    if(!item){
    return res.status(500).json({message:"unable to delete"})
    }
    return res.status(200).json({message:"Succesfully deleted"})
}

export const getUserbyId=async(req,res,next)=>{
    const userId=req.params.id;
    let userItems;
    try{
        userItems=await User.findById(userId).populate("items");
    }
    catch(err){
        return console.log(err)
    }
    if(!userItems){
        return res.status(404).json({message:"No item found"})
    }
    return res.status(200).json({user:userItems})
}
