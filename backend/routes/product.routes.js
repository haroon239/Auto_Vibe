const express = require('express');
const router= express.Router();
const product=require('../controllers/productscontroller');
const upload=require('../controllers/multer');
const { checkPackage } = require('../middlewares/checkPackage'); 
const { verifyToken } = require('../middlewares/auth');

router.post('/',verifyToken,checkPackage, upload.single('image'), product.products);
router.get('/getproducts', product.getproducts);
router.get('/productdetail/:productId', product.detailproduct)
router.get('/products/:userid', product.userproducts)
router.patch('/updateproduct/:userid', upload.single('image'), product.updateproduct);
router.delete('/deleteproduct/:userid', product.deleteproduct);
router.get('/search', product.searchfilter);
module.exports = router;
