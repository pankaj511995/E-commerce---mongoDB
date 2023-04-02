const {getDB}=require('../util/mongo')
const mongodb=require('mongodb')
module.exports = class Order {
  constructor(userid,product) {
    this.userid=userid,
    this.product=product
  }
  orderdetails(){
    const db=getDB()
return db.collection('orders').insertOne(this)
  }
  getorder(id){
    const db=getDB()
   return db.collection('orders').find({userid: new mongodb.ObjectId(id)}).toArray().then(product=>{
      return product
   })
  }
}