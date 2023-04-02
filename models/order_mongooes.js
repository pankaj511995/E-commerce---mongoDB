const mongoose=require('mongoose')

const order = new mongoose.Schema({
   userId:String,
  product:Array
});

module.exports=mongoose.model('orders',order)