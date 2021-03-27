import bcrypt from 'bcryptjs'
const user=[
  {
    name:"Admin",
    email:"admin@gmail.com",
    password:bcrypt.hashSync('123456',10),
    address:"",
    district:"",
    city:"",
    isAdmin:true
  },
  {
    name:"User 2",
    email:"user2@gmail.com",
    password:bcrypt.hashSync('123456',10),
    address:"12/2 đường số 2",
    district:"Bình Phú",
    city:"TP HCM",
    isAdmin:false
  },
  {
    name:"User 3",
    email:"user3@gmail.com",
    password:bcrypt.hashSync('123456',10),
    address:"12/2 đường số 7",
    district:"Bình Hoà",
    city:"TP HCM",
    isAdmin:false
  },
  {
    name:"User 4",
    email:"user4@gmail.com",
    password:bcrypt.hashSync('123456',10),
    address:"12/2 đường số 5",
    district:"Vĩnh Lộc",
    city:"TP HCM",
    isAdmin:false
  },

]

export default user