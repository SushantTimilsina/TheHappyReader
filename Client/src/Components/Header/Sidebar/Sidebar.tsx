import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { sidebarData } from "./sidebarData";

import { Link } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface NavLink {
  name: string;
  path: string;
}

/* ----------------------------- Interfaces Ends ---------------------------- */

/* -------------------------------------------------------------------------- */

const Sidebar: React.FC<{
  showSidebarHandler: () => void;
  showSidebar: boolean;
}> = (props) => {
  return (
    <div
      className={`p-4 text-white fixed bg-primary  left-0 w-full max-h-0 top-[-5rem] overflow-hidden transition-all flex z-20  ${
        props.showSidebar && "top-[0] max-h-screen min-h-[200%]"
      }`}
    >
      <ul className="w-full p-0">
        <li className="h-20 flex">
          <button
            className="text-lg hover:text-secondary"
            onClick={props.showSidebarHandler}
          >
            <AiOutlineClose />
          </button>
        </li>

        {sidebarData.map((data: NavLink, index: number) => {
          const { name, path } = data;
          return (
            <li
              key={index}
              onClick={props.showSidebarHandler}
              className="my-8 hover:text-secondary"
            >
              <Link to={path} className="w-full text-lg">
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(Sidebar);
