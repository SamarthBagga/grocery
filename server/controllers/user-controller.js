import User from "../models/User"

export const getAllUser=async(req,res,next)=>{
  let users;
  try{
      users=await User.find();

  }catch(err){
      return console.log(err);

  }
  if(!users){
      return res.status(404).json({message:"No users found"})
  }
  return res.status(200).json({users});
}


export const signup=async(req,res,next)=>{
  const {number,link}=req.body;
  let existingUser;
  try{
      existingUser=await User.findOne({number});

  }catch(err){
      return console.log(err);
  }
  if(existingUser){
      return res.status(400).json({message:"User already exists"});
  }
  
  const user=new User({
      number,
      link,
      items:[],
  });
  

  try{
      await user.save();
  }catch(err){
      console.log(err);

  }
  return res.status(201).json({user});
}

export const login=async(req,res,next)=>{
  const {number}=req.body;
  let existingUser;
  try{
      existingUser=await User.findOne({number});

  }catch(err){
      return console.log(err);
  }
  if(!existingUser){
      return res.status(404).json({message:"User doesnt exist"});
  }
  return res.status(200).json({message:"login successful",user:existingUser})
}
