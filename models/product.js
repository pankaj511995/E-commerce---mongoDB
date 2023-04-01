const {getDB}=require('../util/mongo')
const mongodb=require('mongodb')
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(id) {
    const db=getDB()
    if(id){
      // this._id=id
      return db.collection('products').updateOne({_id:new mongodb.ObjectId(id)},{$set: this})
    }else{
      return  db.collection('products').insertOne(this)
    }
      
  }
 delete(id){
  const db=getDB()
  return db.collection('products').deleteOne({_id:new mongodb.ObjectId(id)})
 }

  fetchAll(){
    const db=getDB()
  return db.collection('products').find().toArray()
}
findById(proid){
  const db=getDB()
 return db.collection('products').find({_id:new mongodb.ObjectId(proid)}).next().then(product=>{
    return product
  }).catch(err=>console.log('got error while finding id',err))
  }
};
 