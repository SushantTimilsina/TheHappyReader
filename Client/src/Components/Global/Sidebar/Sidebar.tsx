import React, { ReactElement } from "react";

import { Link } from "react-router-dom";
import { sidebarData } from "./sidebarData";
import { RiBarChartHorizontalLine } from "react-icons/ri";

// interface starts
interface SidebarInterface {
  title: string;
  path: string;
  icon: ReactElement;
}

interface Props {
  showSidebar: boolean;
  onSetShowSidebar: (cb: (value: boolean) => boolean) => void;
}
// interface ends
const Sidebar: React.FC<Props> = (props) => {
  const { showSidebar, onSetShowSidebar } = props;
  return (
    <>
      {showSidebar && (
        <div className="bg-black opacity-70 w-screen h-screen fixed md:hidden z-40"></div>
      )}
      {/*  sidebar starts */}
      <aside
        className={`bg-primary fixed md:relative top-0  left-0 h-screen py-4 px-2 transition-all z-50 ${
          !showSidebar &&
          "left-[-100%] md:max-w-[3.5rem] md:left-0 overflow-hidden w-auto"
        }`}
      >
        {/* upper div starts */}
        <div className="mb-4 flex justify-end">
          <span
            className="text-2xl text-white hover:text-secondary cursor-pointer"
            onClick={() => onSetShowSidebar((prev: any) => !prev)}
          >
            <RiBarChartHorizontalLine />
          </span>
        </div>
        {/* upper div ends */}

        {/* Links Start */}
        {sidebarData.map((data: SidebarInterface, index) => {
          const { title, icon, path } = data;
          return (
            <Link
              to={path}
              className="flex gap-6 px-2  pl-2 py-4 text-left items-center hover:bg-secondary rounded-md text-white"
              key={index}
            >
              <span className=" text-2xl">{icon}</span>
              <span
                className={`font-bold text-sm pr-16 ${
                  !showSidebar && "hidden"
                }`}
              >
                {title}
              </span>
            </Link>
          );
        })}
        {/* Links End */}
      </aside>
      {/* sidebar ends */}
    </>
  );
};

export default React.memo(Sidebar);
