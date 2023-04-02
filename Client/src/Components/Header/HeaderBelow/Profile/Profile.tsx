import React, { ReactElement, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  AiFillCaretDown,
  AiOutlinePoweroff,
  AiOutlineUser,
} from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "store/user/user-actions";
import classes from "../MainHeaderBelow.module.css";

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

interface Dropdown {
  icon: ReactElement;
  name: string;
  type: "link" | "button";
  handler?: () => void;
  path?: string;
}

/* ----------------------------- Interfaces Ends ---------------------------- */

/* -------------------------------------------------------------------------- */

const Profile: React.FC<{ user: User }> = (props) => {
  const [showDropdown, setShowDropdown] = useState(false); // state for hiding or showing dropdown

  const { user: userProfile } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dropdown Options
  const dropDownData: Dropdown[] = useMemo(
    () => [
      {
        name: "Profile",
        type: "link",
        path: "/profile",
        icon: <AiOutlineUser />,
      },
      {
        name: "Order",
        type: "link",
        path: "/order",
        icon: <FaShoppingBag />,
      },
      {
        name: "Logout",
        icon: <AiOutlinePoweroff />,
        type: "button",
        handler: () => {
          dispatch(logout());
          navigate("/");
        },
      },
    ],
    [dispatch, navigate]
  );

  return (
    <div>
      {!userProfile ? (
        <button className={classes["main-nav__login"]}>
          <Link to="/login">Login</Link>
        </button>
      ) : (
        <div>
          <h1
            className="flex gap-2 items-center cursor-pointer relative"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <span>{userProfile?.fName || "name"}</span>
            <span>
              <AiFillCaretDown />
            </span>
          </h1>
          {/* dropdown starts here  */}
          {showDropdown && (
            <div className="absolute right-2 bg-white text-black">
              {dropDownData?.map((data: Dropdown, index) => {
                const { name, type, handler, path, icon } = data;
                return (
                  <div
                    className="hover:bg-secondary hover:text-white  cursor-pointer border-b-2 "
                    onClick={() => setShowDropdown(false)}
                    key={index}
                  >
                    {type === "link" ? (
                      <Link
                        to={path || "/"}
                        className="flex justify-between gap-2 items-center px-4 py-3"
                      >
                        <span>{icon}</span>
                        <span>{name}</span>
                      </Link>
                    ) : (
                      <p
                        onClick={handler}
                        className="flex items-center gap-2 px-4 py-3"
                      >
                        <span>{icon}</span> <span>{name}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
