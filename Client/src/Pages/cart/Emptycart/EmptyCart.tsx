import React from "react";
import { Link } from "react-router-dom";
import Button from "Components/UI/Button/Button";

const EmptyCart = () => {
  return (
    <div className="px-10 py-16 border-2 mt-10">
      <h1 className="text-xl font-bold mb-4">
        Your Bag is Empty. Find Something You Love!
      </h1>
      <Button>
        <Link to="/shop">Go Shopping</Link>
      </Button>
    </div>
  );
};

export default React.memo(EmptyCart);
