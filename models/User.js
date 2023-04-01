const {getDB}=require('../util/mongo')
const mongodb=require('mongodb')
module.exports = class User {
  constructor(name, email) {
    this.name=name,
    this.email=email
  }

  save() {
    const db=getDB()
   
      return  db.collection('users').insertOne(this)
    }
 
findUser(id){
  const db=getDB()
 return db.collection('users').find({_id:new mongodb.ObjectId(id)}).next().then(user=>{
    return user
  }).catch(err=>console.log('got error while finding id',err))
  }
};
 