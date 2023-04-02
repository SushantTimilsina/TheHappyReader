import React from "react";
import MainFooter from "../Footer/MainFooter";
import MainHeader from "../Header/MainHeader";

const Layout: React.FC = (props) => {
  return (
    <>
      <div>
        <MainHeader />
        <main className="min-h-[calc(100vh-168px-113px)] mt-[122px]">
          {props.children}
        </main>
        <MainFooter />
      </div>
    </>
  );
};

export default Layout;
