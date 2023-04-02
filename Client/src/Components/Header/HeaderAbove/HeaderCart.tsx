import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeaderCart = () => {
  const cartQuantity = useSelector((state: any) => state.cart.totalQuantity);

  return (
    <>
      <Link to="/cart" className="flex">
        <span className="text-3xl hover:text-secondary">
          <HiOutlineShoppingCart />
        </span>
        <span className="relative bottom-4 right-5">{cartQuantity}</span>
      </Link>
    </>
  );
};

export default React.memo(HeaderCart);
