import express, { Router } from 'express';

import { placeOrder , placeOrderStripe , placeOrderRazapay , updateOrder , allOrders , userOrder} from '../controller/orderController.js';
import adminAuth from '../middleware/adminOuth.js';
import auth from '../middleware/Auth.js';
const orderRouter = express.Router();

// admin feature 
orderRouter.post('/list' , adminAuth,  allOrders)
orderRouter.post('/update', updateOrder)

// payment feature 

orderRouter.post('/place', auth, placeOrder)
orderRouter.post('/stripe', auth, placeOrderStripe)
orderRouter.post('/Razapay', auth ,placeOrderRazapay)

// user feature  

orderRouter.post('/userorder', auth, userOrder)

export default orderRouter;