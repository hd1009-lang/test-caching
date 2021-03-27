import express from 'express'
import User from '../controllers/userCtrl.js';
import auth from '../middleware/auth.js'
import isAdmin from '../middleware/isAdmin.js';
const router=express.Router();

router.post(`/login`,User.authUser)
router.get(`/get-info`,auth,User.getInfor)
router.post(`/register`,User.register);
router.put(`/profile`,auth,User.updateInfo)
router.get(`/all-users`,auth,isAdmin,User.getAllUser)
router.delete(`/del/:id`,auth,isAdmin,User.deleteUser)
router.get(`/:id/edit`,auth,isAdmin,User.getUserById)
router.put(`/:id/edit`,auth,isAdmin,User.updateUserByAdmin)
export default router