const path = require('path');
require('dotenv').config()
const {mongoClient}=require('./util/mongo')
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

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

