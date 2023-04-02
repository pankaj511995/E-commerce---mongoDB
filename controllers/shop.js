const Product = require('../models/product');
const User=require('../models/User')
const Order=require('../models/order')
exports.getProducts = (req, res, next) => {
  const product=new Product()
  product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  const product=new Product()
  product.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
}; 

exports.getCart = (req, res, next) => {
  const cartitem=[]
  req.user.cart.forEach(e=>cartitem.push(e.productid))    
  req.user.findmany(cartitem).then(product=>{
    res.render('shop/cart', { 
    path: '/cart',
  prods:product,
    pageTitle: 'Your Cart'
  });
  })

  
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


exports.productDetails=(req,res)=>{
  const product=new Product()
  product.findById(req.params.id).then(product=>{
    res.render('shop/product-detail', {
      path: '/products',
      product:product,
      pageTitle: 'Checkout'
    });
  })
}
exports.addcart=(req,res)=>{
  const product=new Product()
  product.findById(req.body.productId).then(product=>{
     req.user.addToCart(product).then(result=>{
      res.redirect('/cart')
     })
    })
}
exports.deletecart=(req,res)=>{
  req.user.delete(req.params.id)
  .then(()=>{
    res.redirect('/cart')
  })
}