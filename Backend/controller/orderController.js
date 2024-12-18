import { OrderModel } from "../models/ordermodel.js";
import UserModel from "../models/UserModel.js";


 // placeing order using COD method
export const placeOrder = async  (req, resp ) => {

    try {
        const {userId, items , amount , address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now()
        }

        const newOrder = new OrderModel(orderData)
        await newOrder.save();
        await UserModel.findByIdAndUpdate(userId,{cartData:{}})

        return resp.status(200).json({message:"place Order Successfully !", success:true})
    } catch (error) {
        console.log(error)
        resp.status(500).json({message: "seveer error"})
    }
}

// placing orders using stripe method 
export const placeOrderStripe = async  (req, resp ) => {

}

// placing orders using razapay method

export const placeOrderRazapay = async  (req, resp ) => {

}
 // all order data for frontend admin panel 

export const allOrders = async (req, resp) =>{
    try {

         const order = await OrderModel.find({});        
         resp.status(200).json({message:"all product are sucessfully", success:true, order})
    } catch (error) {
        console.log(error)
        resp.status(500).json({message:"sever error"})
    }
}
  
// update order data for frontend  admin panel

export  const updateOrder = async (req, resp) =>{

}

// user order data for  frontend

export const userOrder = async (req, resp) =>{

    try {
        const { userId } = req.body;
        const order = await OrderModel.find({userId});
        resp.status(200).json({message:"Successfully all users" , success:true, order})
    } catch (error) {
        console.log(error);
        resp.status(500).json({message:"sever error", success:false})
    }
}

