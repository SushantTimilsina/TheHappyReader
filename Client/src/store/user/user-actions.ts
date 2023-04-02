import toast from "react-hot-toast";
import { cartActions } from "store/cart/cart-slice";
import { axiosInstance } from "../../utils/axiosInterceptors";
import { userActions } from "./user-slice";

interface UserInterface {
  fName: string;
  lName: string;
  email: string;
  password: string;
  _id: string;
}

//user login
export const login =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch(userActions.loginPending());
    try {
      const { data } = await axiosInstance.post(`/api/signin`, {
        email,
        password,
      });
      dispatch(userActions.login(data.user));
      localStorage.setItem("Access-Token", data.token);
    } catch (e) {
      dispatch(
        userActions.loginFail(e?.response?.data?.error || "Error Logging in")
      );
    }
  };

// user Register
export const registerUser =
  (firstName: string, lastName: string, email: string, password: string) =>
  async (dispatch: any) => {
    dispatch(userActions.registerPending());
    try {
      const { data } = await axiosInstance.post(`/api/signup`, {
        fName: firstName,
        lName: lastName,
        email,
        password,
      });
      dispatch(userActions.register(data.user));
      localStorage.setItem("Access-Token", data.accessToken);
    } catch (e) {
      dispatch(
        userActions.registerFail(
          e?.response?.data?.error || "Error Registering User"
        )
      );
    }
  };

// fetching user Profile
export const fetchUserProfile = () => async (dispatch: any) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
  };
  try {
    const { data } = await axiosInstance.get("/api/user/profile", { headers });

    dispatch(userActions.userProfile(data));
  } catch (e) {
    console.log(e?.response?.data?.message || "User Profile not found");
  }
};

// updating user Profile
export const updateUserProfile =
  (user: UserInterface) => async (dispatch: any) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
    };

    // loading toast
    toast.dismiss();
    toast.loading("Updating Profile....", { duration: 3000 });

    try {
      const { data } = await axiosInstance.put(`/api/user/${user._id}`, user, {
        headers,
      });
      dispatch(userActions.userProfile(data));
      // showing success toast
      toast.dismiss();
      toast.success("Updated Profile....", { duration: 3000 });
    } catch (e) {
      // showing error toast
      toast.dismiss();
      toast.error(e?.response?.data?.error || "Unable to Update User Profile", {
        duration: 3000,
      });
    }
  };

//user Logout
export const logout =
  (navigate?: (path: string) => void) => async (dispatch: any) => {
    try {
      dispatch(userActions.logout());
      dispatch(cartActions.clearCart());
      localStorage.clear();
      navigate && navigate("/");
    } catch (e) {
      console.error(e.message);
    }
  };
