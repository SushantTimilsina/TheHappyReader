import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "store/products/product-actions";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import DashboardLayout from "../../../../Components/Layout/DashboardLayout/DashboardLayout";
import Spinner from "Components/UI/Spinner/Spinner";
import Message from "Components/UI/Message";
import Button from "Components/UI/Button/Button";
import Card from "Components/UI/Card";
import DeleteModal from "Components/UI/DeleteModal/DeleteModal";
import { Link } from "react-router-dom";
import classes from "./Product.module.css";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface ProductInterface {
  _id: string;
  name: string;
  description: string;
  pages: number;
  price: number;
  quantity: number;
  sold: number;
  language: string;
  author: string;
  genre: string;
  photo: string;
}
/* -------------------------------------------------------------------------- */
/*                              Interfaces Ends                               */
/* -------------------------------------------------------------------------- */

const Product = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const dispatch = useDispatch();

  // getting data from redux store
  const { error, loading, products, prev, next } = useSelector(
    (state: any) => state.products
  );

  // fetching product data
  useEffect(() => {
    dispatch(fetchProducts(page, limit));
  }, [dispatch, page, limit]);

  // canceling delete product
  const cancelDeleteHandler = useCallback(() => {
    setIsDeleting(false);
  }, []);

  // on clicking bin icon
  const setDeletingHandler = useCallback((id: string) => {
    setIsDeleting(true);
    sessionStorage.setItem("productId", id);
  }, []);

  // deteting product
  const confirmDeleteHandler = useCallback(() => {
    dispatch(deleteProduct(page, limit));
    setIsDeleting(false);
  }, [page, limit, dispatch]);

  // clicking next
  const nextPageHandler = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // clicking prev
  const prevPageHandler = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);

  const URL = useMemo(() => `${process.env.REACT_APP_URL}/`, []);

  // if data is fetching
  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-screen w-full flex flex-col justify-center align-middle">
          <Spinner />
        </div>
      </DashboardLayout>
    );
  }

  // if error is present
  if (error) {
    return (
      <DashboardLayout>
        <Message message={error} type="error" />
      </DashboardLayout>
    );
  }

  // main return
  return (
    <>
      {/* model starts here */}
      {isDeleting && (
        <DeleteModal
          onCancel={cancelDeleteHandler}
          message="Are you sure you want to delete this Product?"
          onConfirm={confirmDeleteHandler}
        />
      )}
      {/* model ends here */}
      <DashboardLayout>
        {/* header and button starts  */}
        <div className="flex flex-col md:flex-row justify-between my-8 md:mx-12 lg:mx-24 lg:max-w-[1100px]">
          <h1 className="text-xl mb-4 font-bold ">Product List</h1>
          <Button className="max-w-fit rounded-md">
            <Link to="/admin-dashboard/product/add">Add</Link>
          </Button>
        </div>
        {/* header and button ends */}

        {/* product listing starts */}
        <Card className="mx-4 p-0 md:mx-12 lg:mx-24 lg:max-w-[1100px] rounded-md my-8 pb-14 relative">
          {products?.length === 0 ? (
            <p>No Product Found</p>
          ) : (
            <>
              <table className={`${classes["table"]} w-full  overflow-x-auto`}>
                <thead>
                  <tr className="text-left font-bold bg-primary text-white">
                    <td>Photo</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Config</td>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((data: ProductInterface, index: number) => {
                    const { photo, name, _id, price } = data;
                    return (
                      <tr
                        key={index}
                        className="w-full hover:bg-purple text-left hover:bg-secondary hover:text-white"
                      >
                        <td>
                          <img
                            src={`${URL}${photo}`}
                            alt={name}
                            className="border-2 rounded-full overflow-hidden  h-16 min-w-[4rem]"
                          />
                        </td>

                        {/* product name starts */}
                        <td className="text-xs ">{name}</td>
                        {/* product name ends */}

                        <td className="text-sm">{price}</td>

                        {/* edit delete button starts */}
                        <td className="flex gap-4 text-xl">
                          <Link
                            className="text-gray-400 cursor-pointer"
                            to={`/admin-dashboard/product/edit?productId=${_id}`}
                          >
                            <AiFillEdit />
                          </Link>
                          <span
                            className="text-red-600 cursor-pointer"
                            onClick={() => setDeletingHandler(_id)}
                          >
                            <MdDeleteForever />
                          </span>
                        </td>
                        {/* edit delete button ends */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex gap-2 absolute right-4 bottom-2">
                <Button
                  className="rounded-md"
                  type="button"
                  onClick={prevPageHandler}
                  disabled={!prev}
                >
                  Prev
                </Button>{" "}
                <Button
                  className="rounded-md"
                  onClick={nextPageHandler}
                  disabled={!next}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </Card>
        {/* product listing ends */}
      </DashboardLayout>
    </>
  );
};

export default React.memo(Product);
