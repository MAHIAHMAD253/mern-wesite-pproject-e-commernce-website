import { createContext,  useEffect,  useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const dilivery_fee = '10';
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    const [cartItem, setCartItem] = useState({})
    const navigate = useNavigate()
    const backURl = import.meta.env.VITE_BACKURL;
    const [products, setProducts] = useState([]);
    const [token,setToken] = useState('');



// addtoadd login 

// const addToCart = async (itemId, size) => {

//     if(!size){
//         toast.error("Select the product size")
//         return;
//     }

//     let cartData = structuredClone(cartItem);

//     if (!cartData[itemId]) {
//         cartData[itemId] = {}; 
//     }

//     // Now, check if the size exists within the item

//     if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1; 
//         toast.success("Successfull Add Products")
//         return;
//     } else {
//         cartData[itemId][size] = 1; // Initialize size quantity to 1 if it doesn't exist
//     }

//     // Update the state with the modified cart data
//     setCartItem(cartData);
// };
const addToCart = async (itemId, size) => {

    if (!size) {
        toast.error("Select the product size");
        return;
    }

    let cartData = structuredClone(cartItem);

    // if (!cartData[itemId]) {
    //     cartData[itemId] = {}; 
    // }

    // if (cartData[itemId][size]) {
    //     cartData[itemId][size] += 1; 
    // } else {
    //     cartData[itemId][size] = 1; 
    // }

    
//    if(cartData[itemId]){
//     if(cartData[itemId][size]){
//         cartData[itemId][size] += 1;
//     } else {
//         cartData[itemId][size] = 1;
//     }
//    } else {
//     cartData[itemId] = {};
//     cartData[itemId][size] = 1;
//    }

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

   setCartItem(cartData)

    if(token){
        try { 

            const resp = await axios.post(backURl + '/api/cart/add', {itemId, size} , {headers:{token}})
           if(resp.data.success){
            toast.success(resp.data.message)          
        }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

  
};



const getCartCount = ()=> {
    let  totalCount = 0;

    for(const items in cartItem){ // first in loop item the execute
        for(const item in cartItem[items]){ // second in loop are excute the item size
            try {
               if( cartItem[items][item] > 0){
                totalCount += cartItem[items][item]
               } 
            } catch (error) {
                error
            }
        }
    }
    return totalCount;
}

// update logic

const upDateProduct = async (itemId,size,quantites)=>{

    let cartData = structuredClone(cartItem)

    cartData[itemId][size] = quantites

    setCartItem(cartData)

    if(token){
        try {
            const resp = await axios.post(backURl + '/api/cart/update' , {itemId, size, quantites}, {headers:{token}})
            if(resp.data.success){
                toast.success(resp.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
}


const getUserCart = async (token) => {
    try {
        const resp = await axios.post(backURl + '/api/cart/get' , {} , {headers:{token}});
        if (resp.data.success){
            setCartItem(resp.data.userData)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
}

 // all total count 
const getAllCount = () =>{
    let totalAmount = 0;
    for(const items in cartItem){
        let itemInfo = products.find((product) => product._id === items)
        for(const item in cartItem[items]){
           try {
            if(cartItem[items][item] >0){
                totalAmount += itemInfo.price * cartItem[items][item] 
            }
           } catch (error) {
            error
           }
        }
    }
    return totalAmount;
}


// ---------------fetch api get all product ---------------------


const getProducts = async  ()=>{
    try {
        const resp = await axios.get(backURl + '/api/product/list')
        if(resp.data.success){
            setProducts(resp.data.products)
        } else {
            toast.error(resp.data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.data.message)
    }
}

useEffect(()=>{
    getProducts()
},[])

useEffect(()=>{
    if(!token && localStorage.getItem('token'))
      setToken(localStorage.getItem('token'))
    getUserCart(localStorage.getItem('token'));
    
  },[])


    const value = {

        products, currency, dilivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItem,addToCart,
        getCartCount,
        upDateProduct,
        getAllCount,
        navigate,
        backURl,
        token,setToken,
        setCartItem
      }
     return (
        <ShopContext.Provider 
        value={value}>
            {props.children}
        </ShopContext.Provider>
     )
   
}

export default ShopContextProvider;
