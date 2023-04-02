import toast from "react-hot-toast";
import { cartActions } from "store/cart/cart-slice";
import { axiosInstance } from "../../utils/axiosInterceptors";
import { orderActions } from "./order-slice";

// Interface starts
interface Address {
  country: string;
  city: string;
  province: number;
  zip: number;
  phone: number;
}

interface Product {
  id: string;
  quantity: number;
}
// Interface Ends

type orderStatus = "delivered" | "delivering" | "placed";

export const placeOrder =
  (
    reset: Function,
    navigate: Function,
    address: Address,
    total: number,
    products: Product[],
    type: "khalti",
    payload: any
  ) =>
  async (dispatch: any) => {
    const token = localStorage.getItem("Access-Token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // showing loading toast
    toast.loading("Placing Order....", { duration: 3000 });

    try {
      await axiosInstance.post(
        "/api/orders",
        {
          total: total,
          deliveryLocation: address,
          products,
          payment: { type: type, payload },
          token,
        },
        { headers }
      );
      // showing success toast
      reset();
      localStorage.removeItem("cart");
      localStorage.removeItem("totalQuantity");
      dispatch(cartActions.clearCart());
      toast.dismiss();
      toast.success("Successfully Placed Order", { duration: 3000 });
      setTimeout(() => {
        navigate("/order");
      }, 2000);
    } catch (e) {
      // showing error toast
      toast.dismiss();
      toast.error(e?.response?.data?.error || "Error Placing Order");
    }
  };

export const placeCashOrder =
  (
    reset: Function,
    navigate: Function,
    address: Address,
    total: number,
    products: Product[],
    type: "cash on delivery"
  ) =>
  async (dispatch: any) => {
    const token = localStorage.getItem("Access-Token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // showing loading toast
    toast.loading("Placing Order....", { duration: 3000 });
    try {
      await axiosInstance.post(
        "/api/cash/orders",
        {
          total: total,
          deliveryLocation: address,
          products,
          payment: { type: type },
          token,
        },
        { headers }
      );
      // showing success toast
      reset();
      localStorage.removeItem("cart");
      localStorage.removeItem("totalQuantity");
      dispatch(cartActions.clearCart());
      toast.dismiss();
      toast.success("Successfully Placed Order", { duration: 3000 });
      setTimeout(() => {
        navigate("/order");
      }, 2000);
    } catch (e) {
      // showing error toast
      toast.dismiss();
      toast.error(e?.response?.data?.error || "Error Placing Order");
    }
  };

export const fetchAllOrder = () => async (dispatch: any) => {
  const token = localStorage.getItem("Access-Token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    dispatch(orderActions.setLoading());
    const response = await axiosInstance.get(`/api/orders`, { headers });
    dispatch(orderActions.setOrder(response.data.data.orders));
  } catch (e: any) {
    dispatch(orderActions.setError(e?.message || "Error fetching order"));
  }
};

export const fetchMyOrder = () => async (dispatch: any) => {
  const token = localStorage.getItem("Access-Token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    dispatch(orderActions.setLoading());
    const response = await axiosInstance.get(`/api/my-orders`, { headers });
    console.log("My Orders", response);
    dispatch(orderActions.setMyOrder(response.data.data.orders));
  } catch (e: any) {
    dispatch(orderActions.setError(e?.message || "Error fetching order"));
  }
};

export const changeOrderStatus =
  (id: string, status: orderStatus) => async (dispatch: any) => {
    console.log(status, "status");

    const token = localStorage.getItem("Access-Token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      await axiosInstance.put(`/api/orders/${id}`, { status }, { headers });
      toast.success("Successfully Updated Order", { duration: 3000 });
    } catch (e) {
      toast.error(e?.response?.data?.error || "Error Updating Order");
    }
  };
