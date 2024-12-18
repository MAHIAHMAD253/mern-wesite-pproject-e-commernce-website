import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, dilivery_fee, getAllCount } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between  my-2">
          <p>Subtotal</p>
          <p>{getAllCount()}.00</p>
        </div>
      </div>
      <hr />

      <div className="flex justify-between py-2">
        <p>Shipping Fee</p>
        <p>{currency} {dilivery_fee}</p>
      </div>
      <hr />

      <div className="flex justify-between py-2">
        <b>Total</b>
        <b>{currency} {getAllCount()}</b>
      </div>
    </div>
  );
};

export default CartTotal;
