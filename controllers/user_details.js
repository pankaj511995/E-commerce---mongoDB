const User=require('../models/user_mongooes')

exports.getSignup = (req, res, next) => {
    res.render('user/signup', {
        pageTitle: 'signup',
        path: '/user/signup',
        formsCSS: true,
        productCSS: true
      }); 
  };
  exports.postSignup=(req,res)=>{
console.log('ost sign up')

console.log(req.body,'post sign in')
res.redirect('/user/signin');
  }

exports.getSignin = (req, res, next) => {
    res.render('user/signin', {
      pageTitle: 'signin',
      path: '/user/signin',
      formsCSS: true,
      productCSS: true
    });
  }; 

  exports.postSignin=(req,res)=>{
    
    console.log(req.body,'post sign in')
    res.redirect('/')
  }