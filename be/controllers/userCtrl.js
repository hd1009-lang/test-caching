import UserDB from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import createToken from '../middleware/GenerateToken.js';
const User = {
  authUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserDB.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: 'Sai tài khoản hoặc mật khẩu' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Sai tài khoản hoặc mật khẩu' });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: createToken(user._id),
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  getInfor: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await UserDB.findById(id).select('-password');
      res.json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  register:async (req,res)=>{
    try {
      const {name,email,password}=req.body;
      const user=await UserDB.findOne({email})
      if(user) return res.status(400).json({ msg: 'Tài khoản đã tồn tại' });
      const passHash=await bcrypt.hash(password,10);
      const newUser=new UserDB({
        name,email,password:passHash
      })
      await newUser.save().then(res.json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: createToken(newUser._id),
      }))
      
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  updateInfo:async (req,res)=>{
    try {
      const user=await UserDB.findById(req.user.id);
      if(user){
        user.name=req.body.name || req.user.name;
        user.email=req.body.email || req.user.email;
        user.address=req.body.address || req.user.address;
        user.district=req.body.district || req.user.district;
        user.city=req.body.city || req.user.city;
        if(req.body.password || req.body.passwordNew){
          const isMatch=await bcrypt.compare(req.body.password,user.password);
          if(!isMatch) return res.status(400).json({ msg: 'Sai mật khẩu' });
          user.password=await bcrypt.hash(req.body.passwordNew,10);
        }
      }
      const userUpdate=await user.save();
        res.json({
          _id: userUpdate._id,
          name: userUpdate.name,
          email: userUpdate.email,
          isAdmin: userUpdate.isAdmin,
          token:createToken(userUpdate._id)
        });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  getAllUser:async (req,res)=>{
    try {
      const users=await UserDB.find({});
      res.json(users)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  deleteUser:async (req,res)=>{
    try {
      const user=await UserDB.findById(req.params.id);
      if(!user) return res.status(400).json({msg:"Lỗi"});
      await user.remove();
      res.json({msg:"Done"});
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },
  getUserById:async (req,res)=>{
    try {
      const user=await UserDB.findById(req.params.id).select('-password');
      if(!user) return res.status(400).json({msg:"Lỗi ko co"});
      res.json(user)
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },
  updateUserByAdmin:async (req,res)=>{
    try {
      const user=await UserDB.findById(req.params.id);
      if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        user.isAdmin=req.body.isAdmin 
        const updateUser=await user.save();
        res.json({
          _id: updateUser._id,
          name: updateUser.name,
          email: updateUser.email,
          isAdmin: updateUser.isAdmin,
        });
      }

      
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
};
export default User;
