import ProductMD from '../models/productModel.js';
import User from '../models/userModel.js';
import {client} from '../middleware/cache.js'
const Product = {
  getAllProduct: async (req, res) => {
    try {
      console.log('Fetching data........');
      const pageSize = 6;
      const page = Number(req.query.pageNumber) || 1
      const keyword=req.query.keyword ? {
        name:{
          $regex:req.query.keyword,
          $options:'i'
        }
      }:{}
      const username='allproduct';

      const count = await ProductMD.countDocuments({ ...keyword })
      const products = await ProductMD.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
      const repos=JSON.stringify({ products, page, pages: Math.ceil(count / pageSize)});
      client.setex(username,3600,repos)
      res.json({ products, page, pages: Math.ceil(count / pageSize)})
    } catch (error) {
      return res.status(400).json({ msg: 'Không tìm thấy' });
    }
  },
  getDetailProduct: async (req, res) => {
    try {
      const product = await ProductMD.findById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(400).json({ msg: 'Không tìm thấy' });
    }
  },
  deleteProduct:async (req,res)=>{
    try {
      const product=await ProductMD.findById(req.params.id);
      if(!product) return res.status(400).json({msg:"Lỗi"});
      await product.remove();
      return res.json({msg:"Done"})
    } catch (error) {
      return res.status(400).json(error.message);
      
    }
  },
  createProduct:async (req,res)=>{
    try {
      const product=new ProductMD({
        name:'Sample name',
        price:0,
        user:req.user.id,
        image:'/images/sample.jpg',
        category:'Sample Category',
        brand:'sample brand',
        countInStock:0,
        numReview:0,
        description:'Sample description'
      })
      const createProduct=await product.save();
      res.json(createProduct);
    } catch (error) {
      return res.status(400).json(error.message);
      
    }
  },
  updateProduct:async (req,res)=>{
    try {
      const {name,price,image,category,countInStock,numReview,description,brand}=req.body;
      const product=await ProductMD.findById(req.params.id);
      if(!product) res.status(400).json({msg:"Lỗi"});
      if(product){
        product.name=name
        product.price=price
        product.image=image
        product.category=category
        product.brand=brand
        product.countInStock=countInStock
        product.numReview=numReview
        product.description=description
        
      }
      const updateProduct=await product.save();
      res.json(updateProduct);

    } catch (error) {
      return res.status(400).json(error.message);
      
    }
  },
  createReviewProduct:async (req,res)=>{
    try {
      const {rating,comment}=req.body;
      const product=await ProductMD.findById(req.params.id);
      const user=await User.findById(req.user.id).select('--password')
      if(!product) res.status(400).json({msg:"Lỗi"});
      if(product){
        const alreadyReview=product.review.find(r=>r.user.toString()=== req.user.id.toString())
        if(alreadyReview) return res.status(400).json({msg:"Đã đánh giá"});
      }
      const review={
        name: user.name,
        rating:Number(rating),
        comment:comment,
        user:req.user.id
      }
      product.review.push(review);
      product.numReviews=product.review.length;
      product.rating=product.review.reduce((acc,item)=>item.rating+acc,0)/product.review.length;
      await product.save();
      res.json({msg:"Done"})
    } catch (error) {
      return res.status(400).json(error.message);
      
    }
  }
};
export default Product