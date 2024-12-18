import { v2 as cloudinary } from "cloudinary"

import productModel from "../models/productmodel.js";

// function add product 

// ---------------------------------------------------------------------------------------


export const addProduct = async (req, resp) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        console.log("Uploaded Files:", req.files);

     
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
       
        
        // Map images to Cloudinary URLs

        let imageUrls = await Promise.all(images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image"});
                return result.secure_url;
            })
        );

         const productData = {
            name,
            description,
            category,
            price:Number(price),
            category,
            subCategory,
            bestSeller:bestSeller === 'true' ? true : false,
            sizes:JSON.parse(sizes),
            image:imageUrls,
            date: Date.now()
         }
         console.log(productData)
        const product = new productModel(productData)
        await product.save()
       
         return resp.status(200).json({success:true, message:"Product added"});
        
    } catch (error) {
        console.error(error);

        resp.status(500).json({ message: "An error occurred", error });
    }
};




export const removeProduct = async (req, resp) => {
     try {
        const product = await productModel.findByIdAndDelete(req.body.id)
        resp.status(200).json({success:true,message:"remove product", product})
     } catch (error) {
        console.log(error)
        resp.status(500).json({message:"sever error"})
     }
 }

 // list the product 

export const listProduct = async (req, resp) =>{

try {
    const products = await productModel.find({})
    resp.status(200).json({success:true,products})
} catch (error) {
    console.log(error)
    resp.status(500).json({message:"sever error",})
}


 }

 // single product 

export const singleProduct = async  (req,resp) =>{

    try {
        const { productId} = req.body;
        const product = await productModel.findById(productId)

        resp.status(200).json({success:true, message:"successfullly single product upload", product})
    } catch (error) {
        resp.status(500).json({message:"sever error"})
    }

}
