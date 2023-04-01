const {getDB}=require('../util/mongo')
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db=getDB()
   return  db.collection('products').insertOne(this)
      
  }


};
