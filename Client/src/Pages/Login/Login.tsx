import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../../store/user/user-actions";
import { useForm } from "react-hook-form";
import Message from "../../Components/UI/Message";
import Button from "Components/UI/Button/Button";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface UserInterface {
  error: string;
  loading: boolean;
  user: object;
}

interface FormInterface {
  email: string;
  password: string;
}

/* -------------------------------------------------------------------------- */
/*                              Interfaces Ends                               */
/* -------------------------------------------------------------------------- */

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInterface>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // taking data of user loading and error
  const { loading, error, user }: any = useSelector<UserInterface>(
    (state) => state?.user
  );

  // redirecting to home page for login users
  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user, navigate]);

  // clearing error message after few seconds
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
      // dispatching login action
      dispatch(login(data.email, data.password));

      reset();
    },
    [dispatch, reset]
  );

  return (
    <section className="flex justify-center mt-48">
      <form
        className="w-3/4 max-w-[25rem]"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <h1 className="font-bold text-3xl mb-5">Login Here</h1>

        <Message message={error} />
        <div className="my-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
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
            placeholder="your email here"
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
            Your password
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
            placeholder="your password here"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:border-secondary block w-full p-2.5 focus:outline-none"
          />
          <Message
            message={errors.password?.message ? errors.password.message : ""}
          />
        </div>
        <Button type="submit">{loading ? "Logging in" : "Submit"}</Button>
        <div className="mt-4">
          Not a user?
          <Link
            to="/signup"
            className="text-secondary hover:text-primary underline mx-2"
          >
            sign up here
          </Link>
        </div>
      </form>
    </section>
  );
};

export default React.memo(Login);
