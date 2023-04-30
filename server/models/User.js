const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userSchema = new mongoose.Schema({
  number:{
    type:String,
    required:true
  },
  link:{
    type:String,
    required:true
  },
  items:[{type:mongoose.Types.ObjectId,ref:"Item",required:true}],


});

export default mongoose.model("User",userSchema);


