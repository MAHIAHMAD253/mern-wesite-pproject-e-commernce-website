import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectCloudinary from './Config/Cloudinary.js';
import userRouter from './Routes/UserRoute.js';
import productRouter from './Routes/productRoute.js';
import CartRouter from './Routes/cartRoute.js';
import orderRouter from './Routes/orderRoute.js'
import connectDB from './Config/mongodb.js';



const app = express();
const port = process.env.PORT || 5000
connectDB()
connectCloudinary();


// middleware

app.use(express.json());
app.use(cors());


// API END POINT  

app.use('/api/user', userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart', CartRouter)
app.use('/api/order',orderRouter)


app.listen(port, ()=>console.log("server are connecting", port ))





