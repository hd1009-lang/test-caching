import Order from '../models/orderModel.js';

const order = {
  createOrder: async (req, res) => {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
      
      const newOrder = new Order({
        orderItems,
        user: req.user.id,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        totalPrice,
        itemsPrice,
      });
      const createOrder = await newOrder.save();
      res.json(createOrder);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  getOrderById : async (req, res) => {
   try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
  
    if (!order) return res.status(400).json({msg:"Không tìm thấy"});
    res.json(order)
   } catch (error) {
    return res.status(500).json(error.message);
   }
  },
  updateOrderPaid:async (req,res)=>{
     try {
      const order=await Order.findById(req.params.id);
      if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
          id:req.body.id,
          status:req.body.status,
          update_time:req.body.update_time,
          email_address:req.body.payer.email_address,
        }
        const updateOrder=await order.save();
        res.json(updateOrder)
      }
     } catch (error) {
      return res.status(500).json(error.message);
     }
  },
  getUserOrder:async(req,res)=>{
    try {
      const order=await Order.find({user:req.user.id})
      res.json(order)
    } catch (error) {
      return res.status(500).json({msg:"loi"});
    }
  },
  getOrder:async (req,res)=>{
    try {
      const orders=await Order.find().populate('user',"id name");
      res.json(orders)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  updateOrderToDelivered: async (req, res) => {
 
   try {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
    }
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
   }catch (error) {
    return res.status(500).json(error.message);
   }
  }
};

export default order;
