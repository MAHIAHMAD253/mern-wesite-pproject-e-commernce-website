// // import { useState } from "react"
// // import axios from 'axios'
// // import {backendUrl} from '../App'
// // import { useEffect } from "react";
// // import {toast} from 'react-toastify'
// // import { assets } from "../assets/assets";

// // const Orders = ({token}) => {
// //   const [orderData, setOrderData] = useState([]);

// //   const fetchAllOrder =  async () =>{

// //     if(!token){
// //       return null;
// //     }

// //     try {
      
// //       const resp =  await axios.post(backendUrl + '/api/order/list', {}, {headers:{token}})
// //       if(resp.data.success){
// //         setOrderData(resp.data.order)
// //       } else {
// //         toast.error(resp.data.messsage)
// //       }
// //     } catch (error) {
// //       console.log(error)
// //       toast.error(error.message)  
// //     }
// //   }

// //   useEffect(()=>{
// //     fetchAllOrder()
// //   },[token])
  

// //   return (
// //     <div>
// //       <h3>Order Page</h3>
// //       <div>
// //      {
// //       orderData.map((item , index)=>{
// //         <div key={index}>
// //         <img src={assets.parcel_icon} alt/>
// //         <div>
// //           {
// //             order.items.map((itemm,indexx)=>{
// //               if(index === order.items.length){
// //                 return <p key={indexx}> {itemm.name} x {itemm.quantity} <span>{itemm.size}</span> </p>
// //               } else{
// //                 return <p key={indexx}> {itemm.name} x {itemm.quantity} <span>{itemm.size}</span> </p>
// //               }
// //             })
// //           }
// //         </div>
// //         </div>
// //       })
// //      }
// //     </div>
// //     </div>
// //   )
// // }

// // export default Orders


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";
// import { assets } from "../assets/assets";

// const Orders = ({ token }) => {
//   const [orderData, setOrderData] = useState([]);

//   const fetchAllOrder = async () => {
//     if (!token) {
//       return null;
//     }

//     try {
//       const resp = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
//       if (resp.data.success) {
//         setOrderData(resp.data.order);
//       } else {
//         toast.error(resp.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrder();
//   }, [token]);

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {orderData.map((order, index) => (

//           <div key={index} className="">
//             <img src={assets.parcel_icon} alt="Parcel Icon" />
//             <div className="">
//              {
//               order.items.map((index,item)=>{
//                 if( index === order.items.length){
//                   return <p key={index}> {item.name} x {item.quantity} <span>{item.size}</span></p>
//                 } else {
//                   return <p key={index}> {item.name} x {item.quantity} <span>{item.size}</span></p>
//                 }
//               })
//              }
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orderData, setOrderData] = useState([]);

  const fetchAllOrder = async () => {
    if (!token) {
      return null;
    }

    try {
      const resp = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
      if (resp.data.success) {
        setOrderData(resp.data.order);
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orderData.map((order) => (
          <div key={order._id} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-center border-2 border-gray-200 p-5 md:p-7 my-3 md:my-4 text-xs sm:text-sm text-gray-700">

            <img className="w-12" src={assets.parcel_icon} alt="Parcel Icon" />
            <div >
              {
              order.items.map((item, index) => (
                <p className="py-0.5" key={index}>
                  {item.name} x {item.quantity} <span>{item.size}</span>
                </p>
              ))
              }
            </div>
            <p className="mt-3 pb-3 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
            <div>
              <p>{order.address.street + " ,"}</p>
              <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
            </div>
            <p>{order.address.phone}</p>
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymantMethod}</p>
              <p>Payment: {order.payment}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm">{currency}{order.amount}</p>
            <select>
              <option value="Order Placed">{order.status}</option>
              <option value="Packing">Packing</option>
              <option value="Shipping">Shipping</option>
              <option value="Out of Delivery">Out of Delivery</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>    
          
        ))}
      </div>

      

    </div>
  );
};

export default Orders;

