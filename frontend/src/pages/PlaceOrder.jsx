import { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    backURl,
    cartItem,
    token,
    setCartItem,
    getAllCount,
    dilivery_fee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    email:""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
   
  };

  // const onSubmitChanger = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let ordreItems = [];

  //     for (const items in cartItem) {
  //       for (const item in cartItem[items]) {
  //         if (cartItem[items][item] > 0) {
  //           const itemInfo = structuredClone(
  //             products.find((product) => product._id === items)
  //           );
  //           if (itemInfo) {
  //             itemInfo.size = item,
  //             itemInfo.quantity = cartItem[items][item];
  //             ordreItems.push(itemInfo);
  //           }
  //         }
  //       }
  //     }
      
      
  //     let orderData = {

  //       address:formData,
  //       items: ordreItems,
  //       amount: getAllCount() + dilivery_fee
  //     }

  //     switch (method) {
  //       case 'cod':

  //       try {
  //         const resp = await axios.post(`${backURl}/api/order/place`, orderData, { headers: { token } });
  //         if (resp.data.success) {
  //           setCartItem({});
  //           navigate("/order");
  //         } else {
  //           toast.error(resp.data.message);
  //         }
  //       } catch (error) {
  //         toast.error(error.response?.data?.message);
  //       }
        
  //         break;

  //       default:
  //         break;
  //     }

  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message)
  //   }
  // };

  const onSubmitChanger = async (e) => {
    e.preventDefault();
  
    // Validate form data
    if (
      !formData.firstName ||
      !formData.lastname ||
      !formData.email ||
      !formData.phone ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.zipcode ||
      !formData.country
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
  
    try {
      let ordreItems = [];
  
      // Process cart items
      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          if (cartItem[productId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === productId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItem[productId][size];
              ordreItems.push(itemInfo);
            }
          }
        }
      }
  
      const orderData = {
        address: formData,
        items: ordreItems,
        amount: getAllCount() + dilivery_fee,
      };
  
      switch (method) {
        case "cod":
          try {
            const resp = await axios.post(`${backURl}/api/order/place`, orderData,{ headers: { token } }
            );
            if (resp.data.success) {
              setCartItem({});
              navigate("/order");
            } else {
              toast.error(resp.data.message);
            }
          } catch (error) {
            toast.error(error.response?.data?.message || "Order failed.");
          }
          break;
  
  
        default:
          toast.error("Invalid payment method.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };
  
  return (
    <form
      onSubmit={onSubmitChanger}
      className=" flex  flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ---------------liftside-------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            onChange={onChangeHandler}
            name="lastname"
            value={formData.lastname}
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="email Address"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street address"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
        />

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="zipcode"
            onChange={onChangeHandler}
            name="zipcode" 
            value={formData.zipcode}
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="country"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="phone number"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
        />
      </div>

      {/* -----------------rightside----------------- */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* -----payment method section------ */}
          <div className="flex  flex-col gap-3 lg:flex-row ">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "stripe" ? " bg-green-400" : ""
                } `}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? " bg-green-400" : ""
                } `}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? " bg-green-400" : ""
                }`}
              ></p>
              <p className="text-sm text-gray-500 font-medium mx-4">
                Cash On Delivery
              </p>
            </div>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black hover:text-green-400  text-white px-16 py-3 text-sm rounded-full"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
