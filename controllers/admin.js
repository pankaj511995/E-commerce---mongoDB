const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    editing:false,
    activeAddProduct: true
  });
};  

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
 
  product.save().then(product=>{
    res.redirect('/');
  })
  
};

exports.getProducts = (req, res, next) => {
  const product=new Product()
  product.fetchAll().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
exports.editAddProduct = (req, res, next) => {
  const product=new Product()
  product.findById(req.params.editId).then(product=>{
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    product:product,
    formsCSS: true,
    productCSS: true,
    editing:true,
    activeAddProduct: true
  });
})
}; 
exports.addEditProduct=(req,res)=>{
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save(req.params.editId).then(product=>{
    res.redirect('/admin/products');
  })
  
}
exports.deleteProduct=(req,res)=>{
  const product=new Product()
  product.delete(req.params.deleteId).then(()=>{
    res.redirect('/admin/products');
  })
  
}