const Product = require('../models/product');
const User=require('../models/User')
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
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
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
     req.user.addToCart(product)
     
    //  .then(result=>{
    //   console.log(result,'cart item is added controller')
    //  })
    res.redirect('/products')
  })

}