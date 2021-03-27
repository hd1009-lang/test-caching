import UserDB from '../models/userModel.js';

const isAdmin = async (req, res, next) => {
  try {
    const user=await UserDB.findById(req.user.id)
    if(!user) return res.status(400).json({ msg: 'Không hợp lệ 4' });
    if(!user.isAdmin) return res.status(400).json({ msg: 'Không hợp lệ 5' });
    if(user.isAdmin) next();
  } catch (error) {
    return res.status(500).json({ msg: 'Không hợp lệ 6' });
  }
};

export default isAdmin;
