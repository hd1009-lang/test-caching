import mongoose from 'mongoose'
import dotenv from 'dotenv'
import color from 'colors';
import products from './data/products.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'

import connectDB from './config/db.js'
import Product from './models/productModel.js'
import user from './data/user.js';
dotenv.config();
connectDB();

const importData=async ()=>{
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUser=await User.insertMany(user);

    const adminUser=createUser[0]._id;
    const sampleProduct=products.map(product=>{
      return {...product,user:adminUser}
    })
    await Product.insertMany(sampleProduct);
    console.log('Đã thêm '.green.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
}
const destroyData=async ()=>{
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

   
    console.log('Đã huỷ '.red.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
}

if(process.argv[2]=== '-d'){
  destroyData()
}else{
  importData()
}