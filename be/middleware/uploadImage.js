import fs from 'fs';

const uploadImage= async function(req, res, next) {
  try {
      if(!req.files || Object.keys(req.files).length === 0)
          return res.status(400).json({msg: "0 co"})
          
      const file = req.files.file;
      if(file.size > 1024 * 1024){
          removeTmp(file.tempFilePath)
          return res.status(400).json({msg: "Lon qua"})
      } // 1mb

      if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
          removeTmp(file.tempFilePath)
          return res.status(400).json({msg: "ko dung"})
      }

      next()
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

const removeTmp = (path) => {
  fs.unlink(path, err => {
      if(err) throw err
  })
}

export default uploadImage