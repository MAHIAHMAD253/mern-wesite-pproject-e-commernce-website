import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import RelativeProduct from "../components/RelativeProduct";


const Product = () => {
  const { productId } = useParams();
  const { products , currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  return productData ? (
    <div className=" border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        {/* product image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">

          <div className="flex sm:flex-col overflow-x-auto  justify-between sm:justify-normal sm:w-[18.7%] w-full">
3
            {productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} className=" w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* ------------product info------------- */}

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5"/>
            <img src={assets.star_icon} alt="" className="w-3 5"/>
            <img src={assets.star_icon} alt="" className="w-3 5"/>
            <img src={assets.star_icon} alt="" className="w-3 5"/>
            <img src={assets.star_dull_icon} alt="" className="w-3 5"/>
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-2 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select the size</p>
            <div className="flex gap-2">
            {
              productData.sizes.map((item,index)=>{
                return (
                  <button onClick={()=> setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" :""}`} key={index}>
                    {item}
                  </button>
                )
              })
            }
            </div>
          </div>
          <button onClick={() =>addToCart(productData._id,size)} className="bg-black text-sm text-white  px-8 py-3 active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5"/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is avaviable on this products.</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* ----------------description & review section  */}

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm cursor-pointer">Description</b>
          <p className="border px-5 py-3 text-sm cursor-pointer">Review (122)</p>
        </div>
        <div className=" flex flex-col gap-4 border px-6 py-4 text-sm text-gray-500">
          <p>Customers can shop at home, at work, or on vacation.</p>
          <p>Easy shopping from anywhere makes the whole process more convenient for customers. Browse a wide range of products: Theres no limit to how many products you can sell in an online store, so customers get access to a wider range of products online</p>
        </div>
      </div>

  {/* ------------------------Relative Product----------------- */}

<RelativeProduct category={productData.category} subCategory={productData.subCategory}/>


    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
