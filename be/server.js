import express from 'express'
import dotenv from 'dotenv'
import color from 'colors';
import connectDB from './config/db.js'
import productRouter from './routers/productRoute.js'
import userRouter from './routers/userRouter.js'
import orderRouter from './routers/orderRoute.js'
import uploadRouter from './routers/upload.js'
import fileUpload from 'express-fileupload'
import path from 'path'
import morgan from 'morgan'
dotenv.config();

connectDB();
const app=express();
if(process.env.NODE_ENV==="development"){
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(fileUpload({
  useTempFiles:true
}))
app.use('/api/products',productRouter)
app.use('/api/users',userRouter)
app.use('/api/orders',orderRouter)
app.use('/api/upload',uploadRouter)

app.get('/api/config/paypal',(req,res)=>
res.send(process.env.PAYPAL_CLIENT_ID))
const __dirname=path.resolve();
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,'/fe/build')))
  app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'fe','build','index.html')))
}else{
  app.get('/',(req,res)=>{
    res.send('Api running')
  })
}

app.use((err,req,res,next)=>{
  const statusCode=res.statusCode===200?500:res.statusCode
  res.status(statusCode);
  res.json({
    message:err.message,
    stack:process.env.NODE_ENV === "production"?null:err.stack
  })
})
const port = process.env.PORT || 9000
app.listen(port,console.log(`${process.env.NODE_ENV} Running ${port}`.green.bold));