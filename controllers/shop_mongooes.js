const Product = require('../models/product_mongooes');
const User=require('../models/User')
const Order=require('../models/order')
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

exports.getCart = (req, res, next) => {
  let cartitem=req.user.cart
  console.log(cartitem)
  // req.user.cart.forEach(e=>cartitem.push(e.productid))    
  // req.user.findmany(cartitem).then(product=>{
  //   res.render('shop/cart', { 
  //   path: '/cart',
  // prods:product,
  //   pageTitle: 'Your Cart'
  // });
  // })

  
};

exports.getOrders = (req, res, next) => {
  const order=new Order()
  order.getorder(req.user._id)
  .then(product=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
    prods:product
    });
    
  })
  
};

exports.getCheckout = (req, res, next) => {
  const cartitem=[]
  req.user.cart.forEach(e=>cartitem.push(e.productid))    
  req.user.findmany(cartitem).then(product=>{
    const order=new Order(req.user._id,product)
    return order.orderdetails()
  })
  .then(order=>{
    return req.user.emptycart()
    
  }).then((cart)=>res.redirect('/orders'))
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
exports.deletecart=(req,res)=>{
  req.user.delete(req.params.id)
  .then(()=>{
    res.redirect('/cart')
  })
}