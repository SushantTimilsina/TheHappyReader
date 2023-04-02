import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axiosInterceptors";
import { productActions } from "./product-slice";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */

interface ProductInterface {
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

//fetch Products
export const fetchProducts =
  (page?: number, limit?: number) => async (dispatch: any) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
    };

    dispatch(productActions.productFetching());
    try {
      const { data } = await axiosInstance.get(
        `/api/products?page=${page}&limit=${limit || 10}`,
        { headers }
      );
      dispatch(productActions.productFetched(data));
    } catch (e) {
      dispatch(
        productActions.productFetchingFail(
          e?.response?.data?.error || "Error Fetching Products"
        )
      );
    }
  };

//Fetch Single Product
export const fetchProduct = (id: string) => async (dispatch: any) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
  };

  dispatch(productActions.productFetching());
  try {
    const { data } = await axiosInstance.get(`/api/product/${id}`, { headers });
    dispatch(productActions.SingleProductFetch(data));
  } catch (e) {
    dispatch(
      productActions.productFetchingFail(
        e?.response?.data?.error || "Error Fetching Products"
      )
    );
  }
};

// filter filtered products
export const fetchFilteredProducts =
  (data: Object, page: number, limit: number) => async (dispatch: any) => {
    const filteredProduct = await axiosInstance.post(
      `/api/products/by/search?page=${page}&limit=${limit}`,
      { filters: { genre: data } }
    );
    dispatch(productActions.setFilterProducts(filteredProduct.data));
  };

// adding an product
export const addProduct =
  (
    data: ProductInterface,
    navigate: (path: string) => any,
    reset: () => void
  ) =>
  async (dispatch: any) => {
    // getting jwt from local storage
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
      "Content-Type": "multipart/form-data; ",
    };
    toast.loading("Adding Product....", { duration: 3000 });

    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("genre", data.genre);
    formData.append("author", data.author);
    formData.append("language", data.language);
    formData.append("pages", data.pages.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("photo", data.image[0], data.image[0].name);

    try {
      await axiosInstance.post(`/api/product/create`, formData, { headers });
      // showing success toast
      toast.dismiss();
      toast.success("Successfully Added Product", { duration: 3000 });
      // clearing the form
      reset();
      // navigating after some time
      setTimeout(() => {
        navigate("/admin-dashboard/product");
      }, 3000);
    } catch (e: any) {
      toast.dismiss();
      toast.error(e?.response?.data?.error || "Error Adding Product");
    }
  };

// updating an product
export const updateProduct =
  (
    id: string,
    data: ProductInterface,
    navigate: (path: string) => void,
    reset: () => void
  ) =>
  async (dispatch: any) => {
    // getting jwt from local storage
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
    };
    // loading toast
    toast.loading("Updating Product....", { duration: 3000 });

    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("genre", data.genre);
    formData.append("author", data.author);
    formData.append("language", data.language);
    formData.append("pages", data.pages.toString());
    formData.append("quantity", data.quantity.toString());
    // formData.append("photo", data.image[0], data.image[0].name);

    try {
      await axiosInstance.put(`/api/product/${id}`, formData, {
        headers,
      });
      // showing success toast
      toast.dismiss();
      toast.success("Updated Product....", { duration: 3000 });
      // clearing the form
      reset();
      // navigating after 2 seconds
      setTimeout(() => {
        navigate("/admin-dashboard/product");
      }, 3000);
    } catch (e) {
      // showing error toast
      toast.dismiss();
      toast.error(e?.response?.data?.error || "Error Updating Product", {
        duration: 3000,
      });
    }
  };

// deleting product
export const deleteProduct =
  (page: number, limit: number) => async (dispatch: any) => {
    // getting jwt from local storage
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
    };

    const productId = sessionStorage.getItem("productId");

    // loading toast
    toast.loading("Updating Product....", { duration: 3000 });
    try {
      await axiosInstance.delete(`/api/product/${productId}`, {
        headers,
      });
      // showing success toast
      toast.dismiss();
      toast.success("Deleted Product....", { duration: 3000 });

      // filtering product array
      dispatch(fetchProducts(page, limit));
    } catch (e) {
      // showing error toast
      toast.dismiss();
      toast.error(e?.response?.data?.error || "Error Deleting Product", {
        duration: 3000,
      });
    }
  };
