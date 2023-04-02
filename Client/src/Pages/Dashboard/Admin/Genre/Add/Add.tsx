import { useForm } from "react-hook-form";
import DashboardLayout from "../../../../../Components/Layout/DashboardLayout/DashboardLayout";
import Card from "Components/UI/Card";
import Button from "Components/UI/Button/Button";
import Message from "Components/UI/Message";
import { addGenre } from "store/genre/genre-actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useCallback } from "react";

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
      dispatch(addGenre(data.name, navigate, reset));
    },
    [navigate, reset, dispatch]
  );

  return (
    <>
      <DashboardLayout>
        <h1 className="mb-4 font-bold mx-4 mt-8 text-xl md:mx-12 lg:mx-24">
          Add Genre
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

export default Add;
