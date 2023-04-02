const mongoose=require('mongoose')

const user = new mongoose.Schema({
   name:String,
  email:String,
   
  cart:Array
});

module.exports=mongoose.model('users',user)