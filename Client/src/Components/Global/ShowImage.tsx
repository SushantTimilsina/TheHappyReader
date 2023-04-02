import React, { useMemo } from "react";

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
/* -------------------------------------------------------------------------- */
/*                              Interfaces Ends                               */
/* -------------------------------------------------------------------------- */

const ShowImage: React.FC<{ product: Product }> = (props) => {
  const URL = useMemo(() => process.env.REACT_APP_URL + "/", []);

  const { product } = props;
  return (
    <div>
      <div className="bg-[#eff0f5] w-full h-[14rem]">
        <img
          src={`${URL}${product.photo}`}
          alt={product.name}
          className="my-0 mx-auto w-full h-full"
        />
      </div>
    </div>
  );
};

export default React.memo(ShowImage);
