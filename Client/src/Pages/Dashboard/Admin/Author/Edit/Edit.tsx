import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "../../../../../Components/Layout/DashboardLayout/DashboardLayout";
import Card from "Components/UI/Card";
import Button from "Components/UI/Button/Button";
import Message from "Components/UI/Message";
import { getSingleAuthorData, updateAuthor } from "store/author/author-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { authorActions } from "store/author/author-slice";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface FormInterface {
  name: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/*                              Interfaces Ends                               */
/* -------------------------------------------------------------------------- */

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams(); // hooks for getting value of query string
  //   extracting authorId from query params
  const authorId = useMemo(() => searchParams.get("authorId"), [searchParams]);

  // extracting value from react hook form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInterface>();

  //   calling action creater to fetch author details
  useEffect(() => {
    dispatch(getSingleAuthorData(authorId || ""));
  }, [authorId, dispatch]);

  //   getting author detail from redux store
  const {
    singleAuthorData: authorDetails,
    loading,
    error,
  } = useSelector((state: any) => state.author);

  // clearing error

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      dispatch(authorActions.resetAuthor());
    }, 2000);

    return () => clearTimeout(errorTimeout);
  }, [error, dispatch, navigate]);

  //   setting default value in react hook form
  useEffect(() => {
    reset({
      name: authorDetails?.name || "",
      description: authorDetails?.aboutAuthor || "",
    });
  }, [authorDetails, reset]);

  //   on submitting form
  const formSubmitHandler = useCallback(
    async (data: FormInterface) => {
      dispatch(
        updateAuthor(
          authorId || "",
          data.name,
          data.description,
          navigate,
          reset
        )
      );
    },
    [dispatch, navigate, reset, authorId]
  );

  return (
    <DashboardLayout>
      {error && (
        <Message message={error} type="error" className="text-center text-lg" />
      )}
      <h1 className="mb-4 font-bold mx-4 mt-8 text-xl md:mx-12 lg:mx-24">
        Edit Author
      </h1>
      {/* card starts */}
      <Card className="mx-4 my-2 rounded-md p-10 md:mx-12 lg:mx-24 lg:max-w-[1100px]">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          {/* author name starts */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Author Name
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
              placeholder="Author Name"
            />
            <Message message={errors?.name?.message || ""} />
          </div>
          {/* author name ends */}
          {/* author description starts */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Author Description
            </label>
            <textarea
              {...register("description", {
                required: "Cannot Leave This Field Empty",
                minLength: {
                  value: 10,
                  message: "Description must be atleast 10 letters",
                },
              })}
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-secondary block w-full p-2.5"
              placeholder="Author Description"
              rows={5}
            />
            <Message message={errors?.description?.message || ""} />
          </div>
          {/* author description ends */}

          {/* submit button starts */}
          <Button
            type="submit"
            className="rounded-md disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
          {/* submit button ends */}
        </form>
      </Card>
      {/* card ends */}
    </DashboardLayout>
  );
};

export default React.memo(Edit);
