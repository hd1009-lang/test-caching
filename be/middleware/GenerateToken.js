import jwt from 'jsonwebtoken'

const createToken=(id)=>{
  return jwt.sign({id},process.env.TOKEN_SECRET,{
    expiresIn:'7d'
  })
}

export default createToken