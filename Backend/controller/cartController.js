import UserModel from "../models/UserModel.js";

export const addToCart = async (req, resp) => {

  
  try {

    const { userId , itemId, size } = req.body;

    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;


    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });

    return resp.status(200).json({ success: true, message: "Add to Cart" });
  } catch (error) {
    console.log(error);
    return resp.status({ success: false, message: "Sever error" });
  }
};

// export const updateToCart = async (req, resp) => {
//     try {

//         const {userId, itemId , size , quantites} = req.body;

//         let cartData  = await UserModel.findById(userId);

//         cartData[itemId][size] = quantites;

//         await UserModel.findByIdAndUpdate(userId, {cartData})
//         return resp.status(200).json({success:true , message: "update to cart"})

//     } catch (error) {
//         console.log(error)
//         return resp.status(500).json({success:false, message:"server error"})
//     }
// };


export const updateToCart = async (req, resp) => {
  try {
    const { userId, itemId, size } = req.body;

    // Fetch the user by ID
    const userData = await UserModel.findById(userId);

    // Check if user exists
    if (!userData) {
      return resp.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize or retrieve cartData

     let cartData = userData.cartData || {};



   if(cartData[itemId]){
    if(cartData[itemId][size]){
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }
   } else {
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
   }

    // Update the database with the modified cartData
    await UserModel.findByIdAndUpdate(userId, { cartData });

    // Send a success response
    return resp.status(200).json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserCart = async (req, resp) => {
    try {
        const { userId } = req.body;
        const userData = await UserModel.findById(userId);

        return resp.status(200).json({message: "all the product get" , success: true , userData})
    } catch (error) {
        console.log(error)
        return resp.status(500).json({ success:true, message:"server error"})
    }
};
