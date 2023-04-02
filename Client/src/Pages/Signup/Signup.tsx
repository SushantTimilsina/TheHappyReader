import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout, registerUser } from "../../store/user/user-actions";
import Message from "../../Components/UI/Message";
import { useForm } from "react-hook-form";
import Button from "Components/UI/Button/Button";
import { Link } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface FormInterface {
  fName: string;
  lName: string;
  email: string;
  password: string;
}

interface UserInterface {
  error: string;
  loading: boolean;
  user: object;
}

/* -------------------------------------------------------------------------- */
/*                              Interfaces ends                               */
/* -------------------------------------------------------------------------- */

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInterface>({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // taking data of user loading and error
  const { loading, error, user }: any = useSelector<UserInterface>(
    (state) => state.user
  );

  // navigating the user after login
  useEffect(() => {
    if (user) {
      navigate(-2);
    }
  }, [user, navigate]);

  // clearing the error if present
  useEffect(() => {
    if (!error) {
      return;
    }
    const errorTimeout = setTimeout(() => {
      dispatch(logout());
    }, 3000);

    return () => clearTimeout(errorTimeout);
  }, [error, dispatch]);

  // submitting the form
  const formSubmitHandler = useCallback(
    async (data: FormInterface) => {
      dispatch(registerUser(data.fName, data.lName, data.email, data.password));
      // clearing input field
      reset();
    },
    [reset, dispatch]
  );

  return (
    <section className="flex justify-center mt-48">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="w-[95%] xl:w-3/4 max-w-[35rem]"
      >
        <h1 className="text-3xl font-bold">Create An Account</h1>
        {error && <Message message={error} type="error" />}
        <div className="flex my-6 gap-4">
          <div className="w-[48%]">
            <label
              htmlFor="fName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              {...register("fName", {
                required: "Cannot Leave this Field Empty",
              })}
              type="text"
              id="fName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-secondary block w-full p-2.5 focus:outline-none"
              placeholder="Enter your First Name"
            />
            <Message message={errors.fName?.message || ""} />
          </div>
          <div className="w-[48%]">
            <label
              htmlFor="lName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              {...register("lName", {
                required: "Cannot Leave this Field Empty",
              })}
              type="text"
              id="lName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-secondary block w-full p-2.5 focus:outline-none"
              placeholder="Enter your Last Name"
            />
            <Message message={errors.lName?.message || ""} />
          </div>
        </div>
        <div className="my-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            {...register("email", {
              required: "Cannot Leave this Field Empty",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-secondary block w-full p-2.5 focus:outline-none"
            placeholder="Enter your email"
          />
          <Message
            message={errors.email?.message ? errors.email.message : ""}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            {...register("password", {
              required: "This Field is required",
              minLength: {
                value: 6,
                message: "Password must be greater than 6 character",
              },
            })}
            type="password"
            id="password"
            placeholder="Enter your Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-secondary block w-full p-2.5 focus:outline-none"
          />
          <Message message={errors.password?.message || ""} />
        </div>

        <Button type="submit">{loading ? "Creating account" : "Create"}</Button>
        <h1 className="mt-5">
          Already a user ?{" "}
          <Link
            to="/login"
            className="text-secondary underline hover:text-primary"
          >
            Login
          </Link>
        </h1>
      </form>
    </section>
  );
};

export default React.memo(Signup);
