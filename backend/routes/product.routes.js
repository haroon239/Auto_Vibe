const express = require('express');
const router = express.Router();
const product = require('../controllers/productscontroller');
const upload = require('../controllers/multer');
const { checkPackage } = require('../middlewares/checkPackage');
const { verifyToken } = require('../middlewares/auth');

// ── Wrap multer upload so its errors are visible instead of a silent 500 ──
const uploadWithErrorHandling = (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err) {
            console.error('=== MULTER/CLOUDINARY UPLOAD ERROR ===');
            console.error('Error name:', err.name);
            console.error('Error message:', err.message);
            console.error('Full error:', err);
            return res.status(400).json({
                message: 'Image upload failed',
                error: err.message
            });
        }
        next();
    });
};

router.post('/', verifyToken, checkPackage, uploadWithErrorHandling, product.products);
router.get('/getproducts', product.getproducts);
router.get('/productdetail/:productId', product.detailproduct);
router.get('/products/:userid', product.userproducts);
router.patch('/updateproduct/:userid', uploadWithErrorHandling, product.updateproduct);
router.delete('/deleteproduct/:userid', product.deleteproduct);
router.get('/search', product.searchfilter);

module.exports = router;