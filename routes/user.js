const {Router} = require('express');
const userMongoos=require('../controllers/user_details')

const router =Router();

router.get('/signup', userMongoos.getSignup); 

router.post('/signup', userMongoos.postSignup); 

router.get('/signin', userMongoos.getSignin);

router.post('/signin', userMongoos.postSignin);


module.exports = router;
