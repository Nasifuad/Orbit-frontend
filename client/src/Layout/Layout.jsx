import { Outlet } from "react-router-dom";
import Navbar from "../sections/Navbar";
import Aside from "../sections/Aside";

const Layout = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      <div className="container mx-auto flex justify-between items-start h-full">
        <Navbar />
        <div className="flex flex-col border-[#2c2f33] border-[0.5px] min-h-screen w-full ">
          <Outlet />
        </div>
        <Aside />
      </div>
    </div>
  );
};

export default Layout;
