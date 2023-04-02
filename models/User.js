const {getDB}=require('../util/mongo')
const mongodb=require('mongodb')
 class User {
  constructor(name, email,cart,id) {
    this.name=name,
    this.email=email,
    this.cart=cart,
    this._id=id
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

  addToCart(product){
    const db=getDB()
    let cart;
    if(this.cart){
        const index=this.cart.findIndex(e=>e.productid.toString()===new mongodb.ObjectId(product._id).toString())
          if(index>=0){
            cart=[...this.cart]
            cart[index].quantity=cart[index].quantity+1            
          }else{
            cart=[...this.cart,{productid:product._id,quantity:1}]

          }
    }else{
          cart=[{productid:product._id,quantity:1}]
          }
    return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:cart}})
    
  
  }
  delete(id){
   const car= this.cart.filter(e=>e.productid.toString()!=id.toString())
   const db=getDB()
    return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:car}})
  }
  findmany(arr){
    const db=getDB()
    return  db.collection('products').find({_id:{$in:arr}}).toArray().then(product=>{
      return product.map(p=>{return {...p,quantity:this.cart.find(i=>{
        return i.productid.toString()===p._id.toString()
      }).quantity
    }
  })
    })
  }
};
 
module.exports=User