const Product = require('../models/product_mongood');

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

exports.postAddProduct = async(req, res, next) => {
  try{
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
 await Product.create({title:title, imageUrl:imageUrl, description :description,price: price});
   res.redirect('/'); 
  }catch(err){
    console.log('error while adding product')
  }
};

exports.getProducts = async(req, res, next) => {
    try{
      const products=await Product.find()
      res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }catch(err){
    console.log('error while fetching all data')
  }
};
exports.editAddProduct = async(req, res, next) => {
try{
  const product=await Product.findOne({_id:req.params.editId})
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    product:product,
    formsCSS: true,
    productCSS: true,
    editing:true,
    activeAddProduct: true
  });
}catch(err){
  console.log('error while populating edit item')
}
}; 
exports.addEditProduct=async(req,res)=>{
  try{
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  await Product.updateOne({_id:req.params.editId},{title:title, imageUrl:imageUrl, description :description,price: price}); res.redirect('/admin/products');
  }catch(err){
    console.log('while editing')
  }
  
}
exports.deleteProduct=async(req,res)=>{
  try{
  await Product.deleteOne({_id:req.params.deleteId})
    res.redirect('/admin/products');
  
}catch(err){
  console.log('error while deleting item')
}
  
}