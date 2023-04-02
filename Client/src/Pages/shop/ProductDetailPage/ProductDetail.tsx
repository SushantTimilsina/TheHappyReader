import Message from "Components/UI/Message";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "store/products/product-actions";
import { cartActions } from "store/cart/cart-slice";
import AboutAuthor from "./AboutAuthor";
import AboutProduct from "./AboutProduct";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface Author {
  id: string;
  name: string;
  aboutAuthor: string;
  createdAt: string;
  updatedAt: string;
}

interface Genre {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  genre: Genre;
  author: Author;
  language: string;
  photo: string;
  quantity: number;
  pages: number;
  sold: number;
  __v: number;
}

interface MessageInterface {
  message: string;
  type: "error" | "success";
}
/* -------------------------------------------------------------------------- */
/*                              Interfaces Ends                               */
/* -------------------------------------------------------------------------- */

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalQuantity, setTotalQuantity] = useState(1);
  const [message, setMessage] = useState<MessageInterface | null>(null);

  //fetching product data
  useEffect(() => {
    dispatch(fetchProduct(params?.productId || ""));
  }, [dispatch, params.productId]);

  // getting product store
  const product = useSelector((state: any) => state?.products?.product);

  //on clicking +
  const handleTotalQuantityAdd = useCallback(() => {
    setTotalQuantity(totalQuantity + 1);
  }, [totalQuantity]);
  //on clicking -
  const handleTotalQuantitySub = useCallback(() => {
    setTotalQuantity(totalQuantity - 1);
  }, [totalQuantity]);

  // clearing error message after some time
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage(null);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [message]);

  const URL = useMemo(() => `${process.env.REACT_APP_URL}/`, []);

  // if no product found
  if (!product) {
    return <Message message="No product Found" type="error" />;
  }
  // descructuring products
  const {
    name,
    _id,
    author,
    description,
    genre,
    language,
    pages,
    photo,
    price,
    quantity,
  }: Product = product;

  // adding to cart
  const addToCartHandler = () => {
    // verifying user login
    const token = localStorage.getItem("Access-Token");
    if (!token) {
      setMessage({ message: "Plz login first", type: "error" });
      return;
    }
    dispatch(
      cartActions.addTocart({
        id: _id,
        photo,
        name,
        price,
        quantity: totalQuantity,
        itemQuantity: quantity,
      })
    );
    setMessage({ message: "Added to cart", type: "success" });
  };

  return (
    <>
      <section className="pt-8 bg-[#eff0f5] text-sm pb-16">
        {message && (
          <>
            <Message
              className=" mb-4 text-center text-xl"
              message={message.message}
              type={message?.type || "error"}
            />
          </>
        )}
        {/* upper cart starts  */}
        <div className="flex flex-col bg-white w-full sm:w-3/4 min-h-[16rem] my-0 mx-auto md:flex-row">
          {/* image container starts */}
          <div className="h-60 w-48 pl-2">
            <img src={`${URL}${photo}`} alt={name} className="h-full w-full" />
          </div>
          {/* image container ends */}
          {/*  product details starts */}
          <div className="p-4 text-black">
            <h1 className="my-4 text-xl">{name}</h1>
            <p className="my-4">
              by <span className="text-gray-500">{author?.name || ""}</span>
            </p>
            <hr />
            <p className="text-red-500 text-xl my-2">
              Rs. {(price * totalQuantity).toFixed(2)}
            </p>
            {/* increase and decrease product start */}
            <div className="my-4">
              Total Quantity
              {/* sub button start  */}
              <button
                className="px-2 mx-2 bg-[#ee3d6e] text-xl text-white cursor-pointer border-0 disabled:cursor-not-allowed"
                onClick={handleTotalQuantitySub}
                disabled={totalQuantity <= 1}
              >
                -
              </button>
              {/* sub button end  */}
              {/* add button start */}
              {totalQuantity}
              <button
                className="px-2 mx-2 bg-[#ee3d6e] text-xl text-white cursor-pointer border-0 disabled:cursor-not-allowed"
                onClick={handleTotalQuantityAdd}
                disabled={totalQuantity >= quantity}
              >
                +
              </button>
              {/* add button end  */}
            </div>
            {/* increase and decrease product start */}

            {/* buttons start */}
            <div className="flex flex-col md:flex-row gap-4">
              <button
                className="text-white border-0 cursor-pointer py-4 px-12 text-[1rem] bg-secondary hover:bg-[#0ab2b8]"
                onClick={() => {
                  addToCartHandler();
                  // verifying user login
                  const token = localStorage.getItem("Access-Token");
                  if (!token) {
                    setMessage({ message: "Plz login first", type: "error" });
                    return;
                  }
                  navigate("/cart");
                }}
              >
                Buy now
              </button>
              <button
                className="text-white border-0 cursor-pointer py-4 px-12 text-[1rem] bg-[#ee3d6e] hover:bg-[#dd1a51] disabled:bg-gray-400"
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </div>
            {/* buttons end  */}
          </div>
          {/* product detail ends */}
        </div>
        {/* upper card ends */}

        {/* about author starts  */}
        <AboutAuthor aboutAuthor={author?.aboutAuthor || ""} />
        {/* about author ends  */}

        {/* about product starts  */}
        <AboutProduct
          aboutProduct={{
            description,
            pages,
            name,
            language,
            genre: genre?.name,
          }}
        />
        {/* about product ends */}
      </section>
    </>
  );
};

export default ProductDetail;
