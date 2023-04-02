import React, { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "../../../../../Components/Layout/DashboardLayout/DashboardLayout";
import Card from "Components/UI/Card";
import Button from "Components/UI/Button/Button";
import Message from "Components/UI/Message";
import { getSingleGenreData, updateGenre } from "store/genre/genre-actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { genreActions } from "store/genre/genre-slice";

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
  //   extracting genreId from query params
  const genreId = useMemo(() => searchParams.get("genreId"), [searchParams]);

  // extracting value from react hook form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInterface>();

  //   calling action creater to fetch genre details
  useEffect(() => {
    dispatch(getSingleGenreData(genreId || ""));
  }, [genreId, dispatch]);

  //   getting genre detail from redux store
  const {
    singleGenreData: genreDetails,
    loading,
    error,
  } = useSelector((state: any) => state.genre);

  // clearing error

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      dispatch(genreActions.resetGenre());
    }, 2000);

    return () => clearTimeout(errorTimeout);
  }, [error, dispatch, navigate]);

  //   setting default value in react hook form
  useEffect(() => {
    reset({
      name: genreDetails?.name || "",
      description: genreDetails?.aboutGenre || "",
    });
  }, [genreDetails, reset]);

  //   on submitting form
  const formSubmitHandler = useCallback(
    async (data: FormInterface) => {
      dispatch(
        updateGenre(genreId || "", data.name, data.description, navigate, reset)
      );
    },
    [genreId, dispatch, reset, navigate]
  );

  return (
    <DashboardLayout>
      {error && (
        <Message message={error} type="error" className="text-center text-lg" />
      )}
      <h1 className="mb-4 font-bold mx-4 mt-8 text-xl md:mx-12 lg:mx-24">
        Edit Genre
      </h1>
      {/* card starts */}
      <Card className="mx-4 my-2 rounded-md p-10 md:mx-12 lg:mx-24 lg:max-w-[1100px]">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          {/* genre name starts */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Genre Name
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
              placeholder="Genre Name"
            />
            <Message message={errors?.name?.message || ""} />
          </div>
          {/* genre name ends */}

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

export default Edit;
