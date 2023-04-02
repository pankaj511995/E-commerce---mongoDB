const path = require('path');
require('dotenv').config()
const mongoose=require('mongoose')
const {mongoClient}=require('./util/mongo')
const express = require('express');
const User=require('./models/user_mongooes')
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
mongoose.connect(process.env.URL_MONGO).then(()=>console.log('connected'))
.catch(err=>console.log(err,'got error while connecting'))
const app = express(); 
app.use((req,res,next)=>{ 
     User.findOne({_id:'642989ded3f219b27ab5b4f7'}).then(user=>{
        req.user=user 
        // console.log(user)
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

 