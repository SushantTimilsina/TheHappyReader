import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "Components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredProducts,
  fetchProducts,
} from "store/products/product-actions";
import ShowImage from "Components/Global/ShowImage";
import Spinner from "Components/UI/Spinner/Spinner";
import Message from "Components/UI/Message";
import { getGenreData } from "store/genre/genre-actions";
import Button from "Components/UI/Button";

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
interface ProductInterface {
  author: Author;
  genre: string;
  description: string;
  _id: string;
  name: string;
  price: number;
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

const Shop = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [checkboxData, setCheckboxData] = useState<Array<string>>([]);
  const [displayingProduct, setDisplayingProduct] = useState<Array<Object>>([]);

  // getting data from redux store
  const { products, prev, next, loading, error, filterProducts } = useSelector(
    (state: any) => state?.products
  );

  // getting data from redux store
  const { genre } = useSelector((state: any) => state.genre);

  // fetching product on mount
  useEffect(() => {
    // returning if there is genre selected
    if (checkboxData.length !== 0) return;
    dispatch(fetchProducts(page, 10));
    dispatch(getGenreData(1));
  }, [dispatch, page, checkboxData]);

  useEffect(() => {
    // returning if there is no genre selected
    if (checkboxData.length === 0) return;
    dispatch(fetchFilteredProducts(checkboxData, page, 10));
  }, [checkboxData, dispatch, page]);

  // setting displaying products
  useEffect(() => {
    if (checkboxData.length !== 0) {
      setDisplayingProduct(filterProducts);
      return;
    }
    setDisplayingProduct(products);
  }, [products, filterProducts, checkboxData]);

  // clicking next
  const nextPageHandler = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // clicking prev
  const prevPageHandler = useCallback(() => {
    setPage((prev) => prev - 1);
  }, []);

  // filtering checkbox
  const checkBoxFilterHandler = (genreId: string) => {
    // checking if genre is already selected amd removing it from array
    if (checkboxData.includes(genreId)) {
      setCheckboxData(checkboxData.filter((id) => id !== genreId));
      return;
    }
    // adding genre to array
    setCheckboxData([...checkboxData, genreId]);
  };

  // Loading Products
  if (loading) {
    return (
      <div className="flex flex-col justify-center align-middle h-screen">
        <Spinner />
      </div>
    );
  }
  //  Error Fetching Products
  if (error) {
    return (
      <Message
        message={error}
        type="error"
        className="text-2xl text-center relative top-8"
      />
    );
  }

  return (
    <section className="py-10 xl:px-4">
      <h1 className="text-center text-black text-xl lg:text-4xl font-thin">
        The Book Store
      </h1>
      <p className="text-xs text-center my-4">
        Discover the best book to read right now.
      </p>
      <div className="bg-white flex flex-col lg:grid lg:grid-cols-10 gap-8 mt-8">
        <div className="col-span-2 px-4 p-2 border-r-[1px] border-gray-300">
          <h1 className="text-black text-2xl text-left mb-4">Genre</h1>
          {!genre ? (
            <p>Couldn't fetch Data</p>
          ) : (
            <>
              {genre.length === 0 ? (
                <p>No Genre Found</p>
              ) : (
                <>
                  {genre?.map((data: Genre) => {
                    return (
                      <div className="flex gap-2 items-center" key={data._id}>
                        <input
                          type="checkbox"
                          id={data.name}
                          onChange={() => checkBoxFilterHandler(data._id)}
                        />
                        <p>{data.name}</p>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>

        <div className=" col-span-8 max-w-[1100px]">
          <>
            {displayingProduct?.length === 0 ? (
              <p className="text-center">No Products Found</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mx-4 md:gap-4 ">
                  {displayingProduct?.map((product: any) => {
                    const { _id, name, price } = product;
                    return (
                      <Card
                        key={_id}
                        className="w-[45%] md:w-[30%] min-h-[18rem] min-w-[130px] max-w-[200px] p-0"
                      >
                        <Link to={`/shop/${_id}`}>
                          <ShowImage product={product} />
                          <p className="text-gray-600 py-3 text-xs px-2">
                            {name}
                          </p>
                        </Link>
                        <p className="text-red-500 text-xs px-2 pb-2">
                          Rs. {price}
                        </p>
                      </Card>
                    );
                  })}
                </div>

                <div className="mt-8 flex gap-2 justify-start mx-4">
                  <Button disabled={!prev} onClick={prevPageHandler}>
                    Prev
                  </Button>
                  <Button disabled={!next} onClick={nextPageHandler}>
                    Next
                  </Button>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Shop);
