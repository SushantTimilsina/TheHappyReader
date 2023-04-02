import React from "react";
import Button from "Components/UI/Button";
import { Link } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface PropsInterface {
  totalCost: number;
  cartItems: any;
}

interface cartItem {
  id: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  itemQuantity?: number;
}
/* -------------------------------------------------------------------------- */
/*                              Interfaces ends                               */
/* -------------------------------------------------------------------------- */

const OrderSummary = (props: PropsInterface) => {
  let { totalCost, cartItems } = props;
  return (
    <div className="w-full md:w-3/4">
      <h1 className="text-xl font-bold mt-10 border-b-4 border-black pb-2 w-full uppercase">
        Order Summary
      </h1>

      <div className="mt-8 text-xl">
        <p className="flex justify-between text-gray-500">
          {" "}
          <span>Total</span>
          <span>
            {cartItems?.cart?.map((item: cartItem) => {
              const { price, quantity } = item;
              totalCost += +(price * quantity).toFixed(2);
              return false;
            })}

            {totalCost}
          </span>
        </p>
        <Link
          to="/cart/checkout"

          // onClick={() => khaltiCheckout(totalCost)}
        >
          <Button className=" text-white w-full mt-8 transition-all !py-4">
            Proceed to checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
