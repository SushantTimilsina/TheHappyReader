import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { cartActions } from "store/cart/cart-slice";
import EmptyCart from "./Emptycart/EmptyCart";
import KhaltiCheckout from "khalti-checkout-web";
import OrderSummary from "./OrderSummary";

// interface for Cart Item
interface cartItem {
  id: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  itemQuantity?: number;
}

const Cart = () => {
  const dispatch = useDispatch();
  // getting cart items from redux store
  const cartItems = useSelector((state: any) => state.cart);

  //on clicking +
  const addToCartHandler = useCallback(
    (item: cartItem) => {
      dispatch(
        cartActions.addTocart({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          photo: item.photo,
        })
      );
    },
    [dispatch]
  );
  //on clicking -
  const removeFromCartHandler = useCallback(
    (item: cartItem) => {
      dispatch(cartActions.removeFromCart(item.id));
    },
    [dispatch]
  );

  const URL = useMemo(() => `${process.env.REACT_APP_URL}/`, []);

  let totalCost = useMemo(() => 0, []);

  // Khalti Payment
  let config = {
    // replace this key with yours
    publicKey: "test_public_key_73c8e30a6aef46438d7344431c263668",
    productIdentity: "1234567890",
    productName: "Drogon",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      onSuccess(payload: any) {
        // hit merchant api for initiating verfication
        console.log(payload);
      },
      // onError handler is optional
      onError(error: any) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  let checkout = new KhaltiCheckout(config);
  const khaltiCheckout = (amount: number) => {
    // minimum transaction amount must be 10, i.e 1000 in paisa.
    checkout.show({ amount: amount * 100 });
  };

  return (
    <div className="px-10 py-10 w-full">
      {/* heading starts  */}
      <h1 className=" text-3xl font-bold uppercase">Shopping Bag</h1>
      {/* heading ends  */}
      {cartItems?.cart?.length !== 0 ? (
        <div className="flex w-full flex-col md:flex-row gap-16">
          {/* cart items start  */}
          <div className="w-full">
            {/* back to shop starts */}
            <Link
              className="my-4 text-lg flex items-center gap-2 hover:text-secondary"
              to="/shop"
            >
              <span>
                <BiArrowBack />
              </span>{" "}
              <span>Shop</span>
            </Link>
            {/* back to shop ends */}

            {/* total items starts  */}
            <h1 className="text-xl font-bold  border-b-4 border-black pb-2 w-full uppercase">
              {cartItems?.totalQuantity || "X"} items
            </h1>
            {/* total items ends */}

            {/* items starts */}
            <div>
              {cartItems?.cart?.map((item: cartItem, i: number) => {
                const { id, name, photo, price, quantity, itemQuantity } = item;

                return (
                  <div className="border-b-2 py-4 flex gap-4" key={i}>
                    {/* image container starts */}
                    <div className="h-40 w-40 bg-gray-300">
                      <img
                        src={`${URL}${photo}`}
                        alt={name}
                        className="h-full w-full"
                      />
                    </div>
                    {/* image container ends */}
                    <div>
                      {/*  items details starts */}
                      <div className="flex flex-col gap-2">
                        <p className="font-bold">{name}</p>
                        <p className="text-red-500">
                          Rs. {(price * quantity).toFixed(2)}
                        </p>
                        <p className="text-gray-500">Quantity: {quantity}</p>
                      </div>
                      {/* items details ends */}

                      <div className="my-4">
                        <button
                          className="px-2 mx-2 bg-[#ee3d6e] text-xl text-white cursor-pointer border-0 disabled:cursor-not-allowed"
                          onClick={() =>
                            removeFromCartHandler({
                              id,
                              name,
                              photo,
                              price,
                              quantity: 1,
                            })
                          }
                          // disabled={totalQuantity <= 1}
                        >
                          -
                        </button>
                        {quantity}
                        <button
                          className="px-2 mx-2 bg-[#ee3d6e] text-xl text-white cursor-pointer border-0 disabled:cursor-not-allowed"
                          onClick={() =>
                            addToCartHandler({
                              id,
                              name,
                              photo,
                              price,
                              quantity: 1,
                            })
                          }
                          disabled={
                            itemQuantity
                              ? itemQuantity <= quantity
                              : 2 <= quantity
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* items ends */}
          </div>
          {/* cart items end  */}

          {/* order summary starts  */}
          <OrderSummary totalCost={totalCost} cartItems={cartItems} />
          {/* order summary ends  */}
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default React.memo(Cart);
