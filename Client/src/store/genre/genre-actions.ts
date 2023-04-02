import toast from "react-hot-toast";
import { axiosInstance } from "utils/axiosInterceptors";
import { genreActions } from "./genre-slice";

// adding an genre
export const addGenre =
  (name: string, navigate: (path: string) => any, reset: () => void) =>
  async (dispatch: any) => {
    // getting jwt from local storage
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
    };
    toast.loading("Adding Genre....", { duration: 3000 });
    try {
      await axiosInstance.post(
        `/api/genre/create`,
        {
          name,
        },
        { headers }
      );
      // showing success toast
      toast.dismiss();
      toast.success("Successfully Added Genre", { duration: 3000 });
      // clearing the form
      reset();
      // navigating after some time
      setTimeout(() => {
        navigate("/admin-dashboard/genre");
      }, 3000);
    } catch (e: any) {
      toast.dismiss();
      dispatch(toast.error(e?.response?.data?.error || "Error Adding Genre"));
    }
  };

// fetching all genres
export const getGenreData =
  (page: number, limit?: number) => async (dispatch: any) => {
    // getting jwt from local storage
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
    };
    try {
      dispatch(genreActions.isLoading());
      const { data } = await axiosInstance.get(
        `/api/genres?page=${page}&limit=${limit}`,
        {
          headers,
        }
      );

      dispatch(genreActions.fetchedGenre(data));
    } catch (e) {
      dispatch(
        genreActions.isError(
          e?.response?.data?.message || "Error Fetching Genre"
        )
      );
    }
  };

// fetching single genre
export const getSingleGenreData = (id: string) => async (dispatch: any) => {
  // getting jwt from local storage
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
  };
  try {
    const { data } = await axiosInstance.get(`api/genre/${id}`, { headers });
    dispatch(genreActions.fetchSingleGenre(data));
  } catch (e) {
    console.log("Error fetching genre", e);
  }
};

// updating an genre
export const updateGenre =
  (
    id: string,
    name: string,
    aboutGenre: string,
    navigate: (path: string) => void,
    reset: () => void
  ) =>
  async (dispatch: any) => {
    // getting jwt from local storage
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
    };
    // loading toast
    toast.loading("Updating Genre....", { duration: 3000 });

    try {
      await axiosInstance.put(
        `/api/genre/${id}`,
        { name, aboutGenre },
        { headers }
      );
      // showing success toast
      toast.dismiss();
      toast.success("Updated Genre....", { duration: 3000 });
      // clearing the form
      reset();
      // navigating after 2 seconds
      setTimeout(() => {
        navigate("/admin-dashboard/genre");
      }, 3000);
    } catch (e) {
      // showing error toast
      toast.dismiss();
      toast.error(e?.response?.data?.error || "Error Updating Genre", {
        duration: 3000,
      });
    }
  };

// deleting genre
export const deleteGenre = (page: number) => async (dispatch: any) => {
  // getting jwt from local storage
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
  };

  const genreId = sessionStorage.getItem("genreId");

  // loading toast
  toast.loading("Updating Genre....", { duration: 3000 });
  try {
    await axiosInstance.delete(`/api/genre/${genreId}`, {
      headers,
    });
    // showing success toast
    toast.dismiss();
    toast.success("Deleted Genre....", { duration: 3000 });

    // filtering genre array
    dispatch(getGenreData(page));
  } catch (e) {
    // showing error toast
    toast.dismiss();
    toast.error(e?.response?.data?.error || "Error Deleting Genre", {
      duration: 3000,
    });
  }
};
