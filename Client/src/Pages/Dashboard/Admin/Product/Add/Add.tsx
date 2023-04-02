import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "../../../../../Components/Layout/DashboardLayout/DashboardLayout";
import Card from "Components/UI/Card";
import Button from "Components/UI/Button/Button";
import Message from "Components/UI/Message";
import { addProduct } from "store/products/product-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAuthorData } from "store/author/author-actions";
import { getGenreData } from "store/genre/genre-actions";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */

interface FormInterface {
  name: string;
  description: string;
  pages: number;
  price: number;
  quantity: number;
  sold: number;
  image: any;
  language: string;
  author: string;
  genre: string;
}

/* -------------------------------------------------------------------------- */
/*                              Interfaces Ends                               */
/* -------------------------------------------------------------------------- */

// Main Component Starts
const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // extracting value from react hook form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInterface>();

  //   calling action creater to fetch details
  useEffect(() => {
    dispatch(getAuthorData(1));
    dispatch(getGenreData(1));
  }, [dispatch]);

  //   getting genre detail from redux store
  const { genre: genreDetails } = useSelector((state: any) => state.genre);

  const { author: authorDetails } = useSelector((state: any) => state.author);

  //   on submitting form
  const formSubmitHandler = useCallback(
    (data: FormInterface) => {
      dispatch(addProduct(data, navigate, reset));
    },
    [dispatch, navigate, reset]
  );

  return (
    <>
      <DashboardLayout>
        <h1 className="mb-4 font-bold mx-4 mt-8 text-xl md:mx-12 lg:mx-24">
          Add Product
        </h1>
        {/* card starts */}
        <Card className="mx-4 my-2 rounded-md p-10 md:mx-12 lg:mx-24 lg:max-w-[1100px]">
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            {/* product name starts */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Product Name
              </label>
              <input
                {...register("name", {
                  required: "Cannot Leave This Field Empty",
                  minLength: {
                    value: 5,
                    message: "Name must be atleast 5 letters",
                  },
                })}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-secondary block w-full p-2.5"
                placeholder="Product Name"
              />
              <Message message={errors?.name?.message || ""} />
            </div>
            {/* product name ends */}

            {/* product description starts */}
            <div className="mb-6">
              <label
                htmlFor="dexcription"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Product Description
              </label>
              <textarea
                {...register("description", {
                  required: "Cannot Leave This Field Empty",

                  minLength: {
                    value: 10,

                    message: "Description must be atleast 10 letters",
                  },
                })}
                rows={8}
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-secondary block w-full p-2.5"
                placeholder="Product Name"
              />
              <Message message={errors?.description?.message || ""} />
            </div>
            {/* product description ends */}

            {/* Language starts */}
            <div className="mb-6">
              <label
                htmlFor="language"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Language
              </label>
              <input
                {...register("language", {
                  required: "Cannot Leave This Field Empty",
                })}
                type="text"
                id="language"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-secondary block w-full p-2.5"
                placeholder="Product Name"
              />
              <Message message={errors?.language?.message || ""} />
            </div>
            {/* Language ends */}

            {/* Pages starts */}
            <div className="mb-6">
              <label
                htmlFor="pages"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Pages
              </label>
              <input
                {...register("pages", {
                  required: "Cannot Leave This Field Empty",
                })}
                type="number"
                id="pages"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-secondary block w-full p-2.5"
                placeholder="Pages"
              />
              <Message message={errors?.pages?.message || ""} />
            </div>
            {/* Pages ends */}

            {/* Quantity starts */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Quantity
              </label>
              <input
                {...register("quantity", {
                  required: "Cannot Leave This Field Empty",
                })}
                type="number"
                id="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-secondary block w-full p-2.5"
                placeholder="Quantity"
              />
              <Message message={errors?.quantity?.message || ""} />
            </div>
            {/*Quantity ends */}

            {/* Sold starts */}
            <div className="mb-6">
              <label
                htmlFor="sold"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Sold
              </label>
              <input
                {...register("sold", {
                  required: "Cannot Leave This Field Empty",
                })}
                type="number"
                id="sold"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-secondary block w-full p-2.5"
                placeholder="Sold"
              />
              <Message message={errors?.sold?.message || ""} />
            </div>
            {/*Sold ends */}

            {/* Price starts */}
            <div className="mb-6">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Price
              </label>
              <input
                {...register("price", {
                  required: "Cannot Leave This Field Empty",
                })}
                type="text"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-secondary block w-full p-2.5"
                placeholder="Price"
              />
              <Message message={errors?.price?.message || ""} />
            </div>
            {/*Price ends */}

            {/* image starts */}

            <div className="mb-6">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Image
              </label>

              <input
                {...register("image")}
                type="file"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-secondary block w-full p-2.5"
              />
              <Message message={errors?.image?.message || ""} />
            </div>

            {/* image ends */}

            {/* Genre starts */}
            <div className="mb-6">
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Genre
              </label>
              <select
                id="genre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-secondary block w-full p-2.5"
                {...register("genre", {
                  required: "Cannot Leave This Field Empty",
                  minLength: {
                    value: 1,
                    message: "Cannot Leave This Field Empty",
                  },
                })}
              >
                <option value={""}>Select a Genre</option>
                {genreDetails?.map((project: { _id: string; name: string }) => {
                  const { _id, name } = project;
                  console.log("Genre Id:", _id);

                  return (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  );
                })}
              </select>
              <Message message={errors?.genre?.message || ""} />
            </div>
            {/*Genre ends */}

            {/* Author starts */}
            <div className="mb-6">
              <label
                htmlFor="genre"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Author
              </label>
              <select
                id="genre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-secondary block w-full p-2.5"
                {...register("author", {
                  required: "Cannot Leave This Field Empty",
                  minLength: {
                    value: 1,
                    message: "Cannot Leave This Field Empty",
                  },
                })}
              >
                <option value={""}>Select a Author</option>
                {console.log("genre details", genreDetails)}
                {authorDetails?.map(
                  (project: { _id: string; name: string }) => {
                    const { _id, name } = project;
                    return (
                      <option key={_id} value={_id} className="text-black">
                        {name}
                      </option>
                    );
                  }
                )}
              </select>

              <Message message={errors?.author?.message || ""} />
            </div>
            {/*Author ends */}

            {/* submit button starts */}
            <Button type="submit" className="rounded-md disabled:bg-gray-400">
              Submit
            </Button>
            {/* submit button ends */}
          </form>
        </Card>
        {/* card ends */}
      </DashboardLayout>
    </>
  );
};

export default React.memo(Add);
