const path = require('path');
require('dotenv').config()
const {mongoClient}=require('./util/mongo')
const express = require('express');
const User=require('./models/User')
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();
app.use((req,res,next)=>{
const user=new User()
    user.findUser('64281662241487bb81e8c753').then(user=>{
        req.user=new User(user.name,user.email,user.cart,user._id) 
        next() 
    })
})
app.set('view engine', 'ejs'); 
app.set('views', 'views'); 

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/admin', adminRoutes);
app.use(shopRoutes);
 
app.use(errorController.get404);

mongoClient(client=>{
    console.log(client)
    app.listen(3000);
})

 