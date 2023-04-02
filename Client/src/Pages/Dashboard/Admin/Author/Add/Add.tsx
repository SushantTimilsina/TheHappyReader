import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Card from "Components/UI/Card";
import Button from "Components/UI/Button/Button";
import Message from "Components/UI/Message";
import { addAuthor } from "store/author/author-actions";
import DashboardLayout from "../../../../../Components/Layout/DashboardLayout/DashboardLayout";

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

  //   on submitting form
  const formSubmitHandler = useCallback(
    (data: FormInterface) => {
      dispatch(addAuthor(data.name, data.description, navigate, reset));
    },
    [dispatch, navigate, reset]
  );

  return (
    <>
      <DashboardLayout>
        <h1 className="mb-4 font-bold mx-4 mt-8 text-xl md:mx-12 lg:mx-24">
          Add Author
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
