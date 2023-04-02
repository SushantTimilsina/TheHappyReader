import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../../Global/Navbar";
import Sidebar from "../../Global/Sidebar";
import { useNavigate } from "react-router";
import { axiosInstance } from "utils/axiosInterceptors";

const DashboardLayout = (props: any) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  // only give acces  to admin user
  // useEffect(() => {
  //   const getUserProfile = async () => {
  //     const headers = {
  //       Authorization: `Bearer ${localStorage.getItem("Access-Token")}`,
  //     };
  //     const { data: user } = await axiosInstance.get(`/api/user/profile`, {
  //       headers,
  //     });
  //     if (user?.role !== "admin") {
  //       navigate("/");
  //       return;
  //     }
  //   };
  //   getUserProfile();
  // }, [navigate]);

  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="bg-[#f8f9fa] h-screen md:flex">
        {/* sidebar starts */}
        <Sidebar showSidebar={showSidebar} onSetShowSidebar={setShowSidebar} />
        {/* sidebar ends  */}
        <div className="w-full h-screen overflow-auto">
          <Navbar showSidebar={showSidebar} onSetShowSidebar={setShowSidebar} />
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardLayout);
