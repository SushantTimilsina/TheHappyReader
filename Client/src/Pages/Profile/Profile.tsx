import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { fetchUserProfile, updateUserProfile } from "store/user/user-actions";
import Button from "Components/UI/Button";
import Card from "Components/UI/Card";
import ProfileImage from "../../assets/profile.jpg";
import Message from "Components/UI/Message";

// interface starts
interface UserInterface {
  fName: string;
  lName: string;
  email: string;
  password: string;
  role: "user" | "admin";
  _id: string;
  createdAt: string;
}

interface FormInterface {
  fName: string;
  lName: string;
  email: string;
  password: string;
  _id: string;
}
// interface ends

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInterface>();

  //   getting user data from redux store
  const user: UserInterface = useSelector((state: any) => state.user.user);

  //   Fetching user profile data from the server
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  //   setting default value in react hook form
  useEffect(() => {
    reset({
      fName: user?.fName || "",
      lName: user?.lName || "",
      email: user?.email || "",
      password: user?.password || "",
      _id: user?._id || "",
    });
  }, [user, reset]);

  //   getting access token from local storage
  let accessToken = useMemo(() => localStorage.getItem("Access-Token"), []);

  //   checking user role and redirecting to home page if user is not admin
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
    if (user?.role === "admin") {
      navigate("/admin-dashboard/profile");
    }
  }, [user, navigate, accessToken]);

  const updateProfileHandler = useCallback(
    (data: FormInterface) => {
      dispatch(updateUserProfile(data));
    },
    [dispatch]
  );

  return (
    <>
      <section className="bg-[#eef5f9] px-5 py-10 lg:py-20 min-h-[calc(100vh-168px-113px)]">
        {/* heading of page start */}
        <h2 className="font-bold mb-8 text-2xl text-center">Profile Page</h2>
        {/* heading of page ends */}
        <div className="grid gap-4 lg:grid-cols-12 lg:grid-flow-row ">
          {/* Profile Info starts */}
          <div className="lg:col-span-3 h-full  lg:col-start-2 overflow-hidden min-w-[230px]">
            <Card className="h-full py-10">
              {/* Name and Image Starts */}
              <div className="border-b-2 pb-4 ">
                <div className="bg-gray-200 h-20 w-20 rounded-full my-0 mx-auto">
                  <img
                    src={ProfileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <h3 className="mt-2 text-center">
                  {user?.fName || "First Name"} {user?.lName || "Last Name"}
                </h3>
              </div>
              {/* Name and Image ends */}
              {/* Data starts */}
              <div className="mt-4 text-left">
                <h4>
                  <span className="text-gray-400 text-sm">Email: </span>
                  <span className="block text-sm font-bold">
                    {user?.email || "email"}
                  </span>
                </h4>
                <h4 className="my-4">
                  <span className="text-gray-400 text-sm">Created At: </span>
                  <span className="block text-sm font-bold">
                    {user?.createdAt || "created at"}
                  </span>
                </h4>
              </div>
              {/* Data ends */}
            </Card>
          </div>
          {/* Profile Info ends */}

          {/* Profile Edit starts */}
          <div className="lg:col-span-7 overflow-hidden">
            <Card className="px-5 py-10">
              <form onSubmit={handleSubmit(updateProfileHandler)}>
                {/* First name starts */}
                <div className="flex flex-col mb-4 ">
                  <label htmlFor="" className="mb-2 font-light text-gray-500">
                    First Name
                  </label>
                  <input
                    placeholder="Enter your first name"
                    {...register("fName", {
                      required: "This Field is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                    })}
                    type="text"
                    className="border-2 border-gray-100 px-2 py-1 rounded-sm focus:outline-none focus:border-secondary text-sm"
                  />
                  <Message message={errors.fName?.message || ""} />
                </div>
                {/* First name ends */}
                {/* Last name starts */}
                <div className="flex flex-col mb-4">
                  <label htmlFor="" className="mb-2 font-light text-gray-500">
                    Last Name
                  </label>
                  <input
                    placeholder="Enter your last name"
                    {...register("lName", {
                      required: "This Field is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                    })}
                    type="text"
                    className="border-2 border-gray-100 px-2 py-1 rounded-sm focus:outline-none focus:border-secondary text-sm"
                  />
                  <Message message={errors.lName?.message || ""} />
                </div>
                {/* Last name ends */}
                {/* Email starts */}
                <div className="flex flex-col mb-4">
                  <label htmlFor="" className="mb-2 font-light text-gray-500">
                    Email
                  </label>
                  <input
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Cannot Leave this Field Empty",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                    type="text"
                    className="border-2 border-gray-100 px-2 py-1 rounded-sm focus:outline-none focus:border-secondary text-sm"
                  />
                  <Message message={errors.email?.message || ""} />
                </div>
                {/* Email ends */}
                {/* Password starts */}
                <div className="flex flex-col mb-4">
                  <label htmlFor="" className="mb-2 font-light text-gray-500">
                    Password
                  </label>
                  <small className="text-red-500 mb-2">
                    Note: Use only during password change
                  </small>
                  <input
                    {...register("password")}
                    type="password"
                    className="border-2 border-gray-100 px-2 py-1 rounded-sm focus:outline-none focus:border-secondary text-sm"
                    placeholder="********"
                  />
                  <Message message={errors.password?.message || ""} />
                </div>
                {/* Password ends */}
                <Button type="submit">Update Profile</Button>
              </form>
            </Card>
          </div>
          {/* Profile Edit ends */}
        </div>
      </section>
    </>
  );
};

export default React.memo(Profile);
