import React, { ReactElement, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "@headlessui/react";
import {
  AiOutlineBars,
  AiOutlinePoweroff,
  AiOutlineUser,
} from "react-icons/ai";
import { logout } from "store/user/user-actions";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";

// interface starts
interface Props {
  showSidebar: boolean;
  onSetShowSidebar: (cb: (value: boolean) => boolean) => void;
}

interface Dropdown {
  icon: ReactElement;
  name: string;
  type: "link" | "button";
  handler?: () => void;
  path?: string;
}

//   interface ends

// Main component starts
const Navbar: React.FC<Props> = (props) => {
  const { showSidebar, onSetShowSidebar } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Dropdown Options
  const dropDownData: Dropdown[] = useMemo(
    () => [
      {
        name: "Profile",
        type: "link",
        path: "/admin-dashboard/profile",
        icon: <AiOutlineUser />,
      },
      {
        name: "Logout",
        icon: <AiOutlinePoweroff />,
        type: "button",
        handler: () => {
          dispatch(logout(navigate));
        },
      },
    ],
    [dispatch, navigate]
  );

  const { user: userProfile } = useSelector((state: any) => state.user);
  console.log("user", userProfile);
  const userJwt = useMemo(() => localStorage.getItem("Access-Token"), []);

  useEffect(() => {
    if (!userJwt) {
      logout(navigate);
    }
    if (userProfile?.role !== "admin") {
      navigate("/");
    }
  }, [dispatch, userProfile, navigate, userJwt]);

  return (
    <>
      {/* navbar starts  */}
      <nav className="w-full bg-primary h-20 shadow-sm flex items-center px-4 justify-between">
        {/* sidebar toggle icon starts */}
        <div className="flex items-center">
          <span
            className="flex md:hidden text-2xl cursor-pointer text-white hover:text-secondary"
            onClick={() => onSetShowSidebar((prev: boolean) => !prev)}
          >
            <AiOutlineBars />
          </span>
          {/* sidebar toggle icon ends */}

          <h1 className="p-4 font-bold text-xl text-white">Admin Dashboard</h1>
        </div>

        <div>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center cursor-pointer relative text-white font-bold">
              {userProfile?.fName || "User"}{" "}
              <span className="text-xl">
                <BiChevronDown />
              </span>
            </Menu.Button>
            <Menu.Items className="absolute right-0 bg-white">
              {dropDownData.map((item, index) => {
                return (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={
                          item ? (item?.type === "link" && item.path) || "" : ""
                        }
                        key={index}
                        className={`py-4 cursor-pointer ${
                          active && "bg-secondary"
                        }  hover:text-white px-6 flex items-center justify-center text-sm gap-2`}
                        onClick={item.handler}
                      >
                        {item.icon} {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Menu>
        </div>
      </nav>
      {/* navbar ends */}
    </>
  );
};

export default React.memo(Navbar);
