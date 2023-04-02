import Card from "Components/UI/Card";
import Message from "Components/UI/Message";
import Spinner from "Components/UI/Spinner/Spinner";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "utils/axiosInterceptors";
import ShowImage from "../../Global/ShowImage";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface Author {
  id: string;
  name: string;
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

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | MessageInterface>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/api/products/features`,{
          headers:{
            'Access-Control-Allow-Origin': '*'
          }
        });
        setProducts(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setMessage({ message: "Error Fetching Products", type: "error" });
        console.log(e)
      }
    };
    fetchFeaturedProducts();

    return () => {
      setLoading(true);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center align-middle">
        <Spinner />
      </div>
    );
  }
  return (
    <section className="sm:mx-16 md:mx-24 py-16 px-4 lg:max-w-[1200px] lg:my-0 lg:mx-auto">
      <h1 className=" text-xl font-bold text-left">Featured Products</h1>
      {message && (
        <Message
          message={message.message}
          type={message.type}
          className="text-center"
        />
      )}
      <div className="flex flex-wrap gap-2 md:gap-4 col-span-8">
        {products.map((product: Product) => {
          const { _id, name, price } = product;
          return (
            <Card
              key={_id}
              className="w-[45%] md:w-[30%] min-h-[18rem] min-w-[130px] max-w-[200px] "
            >
              <Link to={`/shop/${_id}`}>
                <ShowImage product={product} />
                <p className="text-gray-600 py-3 text-xs">{name}</p>
              </Link>
              <p className="text-red-500 text-xs">Rs. {price}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(FeaturedProducts);
