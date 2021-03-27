import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(400).json({ msg: 'Không hợp lệ 1' });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: 'Không shợp lệ 2' });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(400).json({ msg: 'Không hợp lệ 3' });
  }
};

export default auth;
