const express = require('express');
const router = express.Router();
const userRegeistration=require("../controllers/userscontroller");



router.post('/signup', userRegeistration.signup);
router.post('/signin', userRegeistration.signin);
router.patch('/user/:userid',userRegeistration.updateuser)
router.get('/adminDashboard/:userid', userRegeistration.AdminDashboard)
router.post('/likedproduct',userRegeistration.likedproduct)
router.post('/likeproductlist',userRegeistration.likedproductlist);
router.post('/removelikeproductlist',userRegeistration.removelikedproduct);
router.get('/verifyemail/:userid', userRegeistration.userverify)
router.get('/allusers', userRegeistration.allusers);
router.delete('/deleteuser/:id', userRegeistration.deleteuser);







// // payment.routes.js
// router.get('/allpayments', payment.allpayments);

module.exports = router;