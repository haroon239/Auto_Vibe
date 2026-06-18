const express= require('express');
const router=express.Router();
const productclick=require('../controllers/clickcontroller');

router.post('/', productclick.productclick);
router.get('/getclick/:productId',productclick.getclick);

module.exports=router;