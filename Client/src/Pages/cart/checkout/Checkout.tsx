import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "Components/UI/Button";
import Message from "Components/UI/Message";
import PaymentModal from "Components/Global/PaymentModal";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { placeCashOrder, placeOrder } from "store/order/order-actions";
import KhaltiCheckout from "khalti-checkout-web";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface Address {
  country: string;
  city: string;
  province: number;
  zip: number;
  phone: number;
}

interface Product {
  id: string;
  quantity: number;
  price: number;
}
/* -------------------------------------------------------------------------- */
/*                              Interfaces Ends                               */
/* -------------------------------------------------------------------------- */

const Checkout = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [locationData, setLocationData] = useState<Address | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Array<Product>>([]);
  const [totalCost, setTotalCost] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>({});

  const hideModal = () => {
    setShowModal(false);
  };

  const formSubmitHandler = (data: Address) => {
    setShowModal(true);
    setLocationData(data);
  };

  const cartData = useSelector((state: RootStateOrAny) => state.cart.cart);

  const paymentHandler = () => {
    if (!locationData) return;
    dispatch(
      placeCashOrder(
        reset,
        navigate,
        locationData,
        totalCost,
        filteredProducts,
        "cash on delivery"
      )
    );
  };

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
        if (!locationData) return;
        dispatch(
          placeOrder(
            reset,
            navigate,
            locationData,
            totalCost,
            filteredProducts,
            "khalti",
            payload
          )
        );
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
  const khaltiCheckout = (amount: number = totalCost) => {
    // minimum transaction amount must be 10, i.e 1000 in paisa.
    checkout.show({ amount: amount * 100 });
  };

  useEffect(() => {
    // filter product id and quantity
    const filteredProducts = cartData.map((product: Product) => {
      const { id, quantity } = product;
      return { id, quantity };
    });
    setFilteredProducts(filteredProducts);

    // getting total quantity
    const totalPrice = cartData.reduce((acc: number, product: Product) => {
      return acc + product.price * product.quantity;
    }, 0);
    setTotalCost(totalPrice);
  }, [cartData]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      {showModal && (
        <PaymentModal
          onCancel={hideModal}
          onConfirm={paymentHandler}
          onKhaltiCheckout={khaltiCheckout}
        />
      )}
      <div className="py-10">
        <form
          className="w-[95%] max-w-[50rem] my-0 mx-auto"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <h1 className=" text-xl mb-8 font-bold">Checkout Details</h1>
          {/* city and country starts */}
          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/2 md:pr-3  mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-country"
              >
                Country*
              </label>
              <input
                {...register("country", { required: "This field is Required" })}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-secondary"
                id="grid-country"
                type="text"
                placeholder="Enter country name"
              />
              <Message message={errors.country?.message || ""} />
            </div>
            <div className="w-full md:w-1/2">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-City"
              >
                City*
              </label>
              <input
                {...register("city", { required: "This field is Required" })}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-secondary"
                id="grid-City"
                type="text"
                placeholder="Enter city name"
              />
              <Message message={errors.city?.message || ""} />
            </div>
          </div>
          {/* city and country ends */}

          {/* province starts */}
          <div className="flex flex-wrap  mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-province"
            >
              Province*
            </label>
            <input
              {...register("province", { required: "This field is Required" })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-secondary"
              id="grid-province"
              type="number"
              placeholder="Enter Province Here"
            />
            <Message message={errors.province?.message || ""} />
          </div>
          {/* province ends */}

          {/* Zip code starts */}
          <div className="flex flex-wrap  mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Zip*
            </label>
            <input
              {...register("zip", { required: "This field is Required" })}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-secondary"
              id="grid-zip"
              placeholder="Enter Zip Code"
              type="number"
            />
            <Message message={errors.zip?.message || ""} />
          </div>
          {/* Zip code ends */}

          {/* Phone Starts */}
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Phone*
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Phone Number"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-secondary"
              {...register("phone", {
                required: "This field is required",
                pattern: {
                  value: /^(|-)(?:[0-9]{10})$/i,
                  message: "Invalid Phone Number Type",
                },
              })}
            />
            <Message message={errors.phone?.message || ""} />
          </div>
          {/* Phone Ends */}

          <Button type="submit">Continue</Button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
