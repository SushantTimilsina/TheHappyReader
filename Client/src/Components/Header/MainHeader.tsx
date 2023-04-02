import React, { useCallback, useState } from "react";
import MainHeaderAbove from "./HeaderAbove/MainHeaderAbove";
import MainHeaderBelow from "./HeaderBelow/MainHeaderBelow";
import Sidebar from "./Sidebar/Sidebar";

const MainHeader = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const showSidebarHandler = useCallback(() => {
    setShowSidebar((prev) => {
      return !prev;
    });
  }, []);

  return (
    <header className="px-5 flex py-4 flex-col bg-primary text-white fixed top-0 w-full z-10 min-h-[127px]">
      <MainHeaderAbove showSidebarHandler={showSidebarHandler} />
      <Sidebar
        showSidebar={showSidebar}
        showSidebarHandler={showSidebarHandler}
      />
      <MainHeaderBelow />
    </header>
  );
};

export default React.memo(MainHeader);
