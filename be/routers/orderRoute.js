import express from 'express'
const router = express.Router();
import auth from '../middleware/auth.js'
import isAdmin from '../middleware/isAdmin.js'
import order from '../controllers/orderCtrl.js'

router.post(`/`,auth,order.createOrder);
router.get(`/list`,auth,isAdmin,order.getOrder);
router.get(`/my-order`,auth,order.getUserOrder);
router.get(`/:id`,auth,order.getOrderById);
router.put(`/:id/pay`,auth,order.updateOrderPaid);
router.put(`/:id/delivered`,auth,order.updateOrderToDelivered);
export default router