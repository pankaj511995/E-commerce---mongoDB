const Product = require('../models/product_mongooes');
const Order=require('../models/order_mongooes')
const User=require('../models/user_mongooes')
exports.getProducts = async(req, res, next) => {
  try{
    const products=await Product.find()
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
   }catch(err){
     console.log('error while showing product')
   }
};

exports.getIndex =async (req, res, next) => {
  try{
 const products=await Product.find()
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    
  });
}catch(err){
  console.log('error while showing shop')
}
}; 

exports.getCart = async(req, res, next) => {
  try{
     const prod=await getproduct(req)
        res.render('shop/cart', { 
        path: '/cart',
      prods:prod,
        pageTitle: 'Your Cart'
      }); 
}catch(err){
  console.log('error gating cart')
}
};

exports.getOrders = async(req, res, next) => {
  try{
    const order=await Order.find({userId:req.user._id})
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
    prods:order
    });
}catch(err){
  console.log('error while gaating all oreder details')
}
  
};

exports.getCheckout = async(req, res, next) => {
  try{
    const product=await getproduct(req)
    await Order.create({userId:req.user._id,product:product})
    await User.updateOne({_id:req.user._id},{cart:[]})
  res.redirect('/orders')
  }catch(err){
    console.log('err to get order')
  }
};


exports.productDetails=async(req,res)=>{
  try{
  const product=await Product.findOne({_id:req.params.id})
    res.render('shop/product-detail', {
      path: '/products',
      product:product,
      pageTitle: 'Checkout'
    });
  }catch(err){
    console.log('error in details')
  }
}
exports.addcart=async(req,res)=>{
  try{
      const product=await Product.findOne({_id:req.body.productId})
      let cart;
      const c=req.user.cart
      if(c.length!=0){
      const index=c.findIndex(e=>e.productid.toString()===product._id.toString())
        if(index===-1){
          cart=[...c,{productid:product._id,quantity:1}]
        }else{
          cart=[...c]
          cart[index].quantity=cart[index].quantity+1
        }
      }else{
        cart=[{productid:product._id,quantity:1}]
      }
      await req.user.updateOne({cart:cart})
          res.redirect('/cart')
}catch(err){
  console.log('error while adding to cart')
}
}
exports.deletecart=async(req,res)=>{
  try{
  const cart=req.user.cart.filter(e=>e.productid.toString()!=req.params.id)
  await User.updateOne({_id:req.user._id},{cart:cart})
    res.redirect('/cart')
  }catch(err){
    console.log('error while deleting cart item')
  }
}

function getproduct(req){
  return new Promise(async(resolve,reject)=>{
    let cartitem=req.user.cart.map(e=>e.productid)
    const product=await Product.find({_id:{$in:cartitem}})
      const prod=product.map(cart=>{
        return{cart,
        quantity:req.user.cart.find(e=>cart._id.toString()===e.productid.toString()).quantity}
              })
              resolve(prod)
  })
}