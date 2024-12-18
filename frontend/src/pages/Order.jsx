import { useContext, useEffect, useState } from "react"
import Title from "../components/Title"
import { ShopContext } from "../context/ShopContext"
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {

  const [orderData , setOrderData] = useState([]);
  const { backURl , token , currency } = useContext(ShopContext)

  const loadOrderData = async () =>{
    try {
      if(!token){
        return null
      }

      const resp = await axios.post(backURl + '/api/order/userOrder', {} , {headers:{token}});
      if(resp.data.success){
        let allOrdersItem = [];
        resp.data.order.map((order)=>{
          order.items.map((items)=>{
            items['status'] = order.status
            items['payment'] = order.payment
            items['paymentMethod'] = order.paymentMethod
            items['date'] = order.date
            allOrdersItem.push(items)
           })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    loadOrderData();
  },[token])
  return (
    <div className="border-t pt-16">

      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"}/>
      </div>

      <div>
        {
          orderData.slice(1,5).map((item,index)=>{
            return(
              <div className="border-t py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4" key={index}>

                <div className="flex items-start gap-6 text-sm">
                  <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-600">
                      <p className="text-lg">{currency}{item.price}</p>
                      <p> Quantity:{item.qauntity}</p>
                      <p>Size:{item.size}</p>
                    </div>
                    <div>
                      <p>Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                      <p>payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-3">
                      <p className="min-w-2 h-2 rounded-full bg-green-600"></p>
                      <p>{item.status}</p>
                    </div>
                    <button onClick={loadOrderData} className="border px-4 py-2  text-sm font-medium rounded-sm">Track Order</button>
                  </div>
              </div>
            )
          })
        }
        
      </div>
    </div>
  )
}

export default Order