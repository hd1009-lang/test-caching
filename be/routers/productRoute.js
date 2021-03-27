import express from 'express'
const router = express.Router();
import Product from '../controllers/productCtrl.js'
import auth from '../middleware/auth.js'
import isAdmin from '../middleware/isAdmin.js'
router.get('/',Product.getAllProduct);
router.get('/:id',Product.getDetailProduct);
router.post('/create',auth,isAdmin,Product.createProduct)
router.delete('/:id/delete',auth,isAdmin,Product.deleteProduct)
router.put('/:id/edit',auth,isAdmin,Product.updateProduct)
router.post('/:id/review',auth,Product.createReviewProduct)
export default router