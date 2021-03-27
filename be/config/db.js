import mongoose from 'mongoose'
const connectDB=async()=>{
  try {
    const conn=await mongoose.connect(process.env.MONGO_URI,{
      useUnifiedTopology:true,
      useNewUrlParser:true,
      useCreateIndex:true
    })
    console.log(`Mongo db connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`${error.messenger}`.red.underline.bold);
    process.exit(1);
  }
}
export default connectDB