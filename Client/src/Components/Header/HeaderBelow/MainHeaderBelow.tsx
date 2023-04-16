import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { fetchUserProfile, logout } from "store/user/user-actions";
import NavigationBar from "./NavigationBar";
import Profile from "./Profile";
import SearchDropdown from "../SearchDropdown";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface User {
  _id: string;
  createdAt: string;
  email: string;
  role: "admin" | "user";
  fName: string;
  lName: string;
}

/* ----------------------------- Interfaces Ends ---------------------------- */

/* -------------------------------------------------------------------------- */

// Main Component
const MainHeaderBelow = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting the value of user
  const userProfile: User = useSelector(
    (state: RootStateOrAny) => state.user.user
  );

  // Fetching user Profile
  useEffect(() => {
    const accessToken = localStorage.getItem("Access-Token");
    if (!accessToken) {
      return;
    }
    dispatch(fetchUserProfile());
  }, []);

  const userJwt = useMemo(() => localStorage.getItem("Access-Token"), []);

  useEffect(() => {
    if (!userJwt) {
      logout(navigate);
    }
    if (userProfile?.role === "admin") {
      navigate("/admin-dashboard");
    }
  }, [dispatch, userProfile, navigate, userJwt]);

  return (
    <div className="flex justify-between items-center pt-4">
      {/* Navbar Component Here  */}
      <NavigationBar />

      {/* Search Starts Here  */}
      <div className="w-20vw md:hidden flex w-2/3 relative">
        <input
          type="text"
          placeholder="search"
          className=" text-black py-2 px-3 border-[1px] outline-none border-secondary w-full"
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <span className="bg-secondary p-2 cursor-pointer flex items-center hover:bg-[#26b8b0]">
          <BsSearch />
        </span>
        <SearchDropdown searchKeyword={searchKeyword} />
      </div>
      {/* Search Ends Here  */}

      {/* Login and user Dropdown starts Here */}
      <Profile user={userProfile} />
    </div>
  );
};

export default React.memo(MainHeaderBelow);
