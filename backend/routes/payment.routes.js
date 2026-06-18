const express=require('express');
const router=express.Router();

const payment=require('../controllers/paymentcontroller');

router.post('/create-checkout-session',  payment.paymentintegrate);
router.post('/paymentAdd', payment.addPayment );
router.get('/getpayments/:userid',payment.getpayments);


// get all payments
router.get('/allpayments', payment.allpayments);



module.exports=router;