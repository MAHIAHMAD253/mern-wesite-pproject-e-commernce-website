import express from 'express';
import { addToCart , updateToCart , getUserCart } from '../controller/cartController.js';
import auth from '../middleware/Auth.js';
const CartRouter = express.Router();


CartRouter.post('/get', auth,  getUserCart)
CartRouter.post('/add',auth,  addToCart)
CartRouter.post('/update', auth, updateToCart )

export default CartRouter;

