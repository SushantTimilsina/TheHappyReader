import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import HeaderCart from "./HeaderCart";
import logo from "../../../assets/logo.png";
import SearchDropdown from "../SearchDropdown";

interface PropsInterface {
  showSidebarHandler: () => void;
}

const MainHeaderAbove = (props: PropsInterface) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        {/* sidebar toggle starts */}
        <div
          className="text-white md:hidden cursor-pointer hover:text-secondary text-2xl"
          onClick={props.showSidebarHandler}
        >
          <FaBars />
        </div>
        {/* sidebar toggle ends */}
        {/* logo starts */}
        <div className="h-8 w-48">
          <Link to="/">
            {/* <img src={logo} alt="logo" className="h-full w-full" /> */}
          </Link>
        </div>
        {/* logo ends */}
      </div>
      {/* search and cart starts */}
      <div className="flex  items-center w-[76%] justify-end ">
        {/* search starts */}
        <div className="w-20vw hidden md:flex w-full mr-20 relative">
          <input
            onChange={(e) => setSearchKeyword(e.target.value)}
            type="text"
            placeholder="search"
            className=" text-black p-2 border-[1px] outline-none border-secondary w-full"
          />
          <span className="bg-secondary py-2 px-3  cursor-pointer flex items-center hover:bg-[#26b8b0]">
            <BsSearch />
          </span>
          {/* search dropdown starts */}
          <SearchDropdown searchKeyword={searchKeyword} />
          {/* search dropdown ends */}
        </div>

        {/* search ends */}
        {/* cart component here*/}
        <HeaderCart />
      </div>
      {/* search and cart ends */}
    </div>
  );
};

export default React.memo(MainHeaderAbove);
