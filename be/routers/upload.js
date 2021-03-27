import express from 'express'
const router=express.Router();
import uploadImage from '../middleware/uploadImage.js'
import uploadCtrl from '../controllers/uploadCtrl.js'

router.post('/', uploadImage, uploadCtrl.uploadAvatar)

export default router