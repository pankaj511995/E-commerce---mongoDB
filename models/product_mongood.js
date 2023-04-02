const mongoose=require('mongoose')

const product = new mongoose.Schema({
   title:String,
  imageUrl:String,
   description:String,
  price:Number
});

module.exports=mongoose.model('products',product)