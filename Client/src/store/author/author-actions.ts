import toast from "react-hot-toast";
import { axiosInstance } from "utils/axiosInterceptors";
import { authorActions } from "./author-slice";

// adding an author
export const addAuthor =
  (
    name: string,
    aboutAuthor: string,
    navigate: (path: string) => any,
    reset: () => void
  ) =>
  async (dispatch: any) => {
    // getting jwt from local storage
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
    };
    toast.loading("Adding Author....", { duration: 3000 });
    try {
      await axiosInstance.post(
        `/api/author/create`,
        {
          name,
          aboutAuthor,
        },
        { headers }
      );
      // showing success toast
      toast.dismiss();
      toast.success("Successfully Added Author", { duration: 3000 });
      // clearing the form
      reset();
      // navigating after some time
      setTimeout(() => {
        navigate("/admin-dashboard/author");
      }, 3000);
    } catch (e: any) {
      toast.dismiss();
      dispatch(toast.error(e?.response?.data?.error || "Error Adding Author"));
    }
  };

// fetching all authors
export const getAuthorData =
  (page: number, limit?: number) => async (dispatch: any) => {
    // getting jwt from local storage
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
    };
    try {
      dispatch(authorActions.isLoading());
      const { data } = await axiosInstance.get(
        `/api/authors?page=${page}&limit=${limit}`,
        {
          headers,
        }
      );

      dispatch(authorActions.fetchedAuthor(data));
    } catch (e) {
      dispatch(
        authorActions.isError(
          e?.response?.data?.message || "Error Fetching Authors"
        )
      );
    }
  };

// fetching single author
export const getSingleAuthorData = (id: string) => async (dispatch: any) => {
  // getting jwt from local storage
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
  };
  try {
    const { data } = await axiosInstance.get(`api/author/${id}`, { headers });
    dispatch(authorActions.fetchSingleAuthor(data));
  } catch (e) {
    console.log("Error fetching athor", e);
  }
};

// updating an author
export const updateAuthor =
  (
    id: string,
    name: string,
    aboutAuthor: string,
    navigate: (path: string) => void,
    reset: () => void
  ) =>
  async (dispatch: any) => {
    // getting jwt from local storage
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
    };
    // loading toast
    toast.loading("Updating Author....", { duration: 3000 });

    try {
      await axiosInstance.put(
        `/api/author/${id}`,
        { name, aboutAuthor },
        { headers }
      );
      // showing success toast
      toast.dismiss();
      toast.success("Updated Author....", { duration: 3000 });
      // clearing the form
      reset();
      // navigating after 2 seconds
      setTimeout(() => {
        navigate("/admin-dashboard/author");
      }, 3000);
    } catch (e) {
      // showing error toast
      toast.dismiss();
      toast.error(e?.response?.data?.error || "Error Updating Author", {
        duration: 3000,
      });
    }
  };

// deleting author
export const deleteAuthor = (page: number) => async (dispatch: any) => {
  // getting jwt from local storage
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
  };

  const authorId = sessionStorage.getItem("authorId");

  // loading toast
  toast.loading("Updating Author....", { duration: 3000 });
  try {
    await axiosInstance.delete(`/api/author/${authorId}`, {
      headers,
    });
    // showing success toast
    toast.dismiss();
    toast.success("Deleted Author....", { duration: 3000 });

    // filtering author array
    dispatch(getAuthorData(page));
  } catch (e) {
    // showing error toast
    toast.dismiss();
    toast.error(e?.response?.data?.error || "Error Deleting Author", {
      duration: 3000,
    });
  }
};
