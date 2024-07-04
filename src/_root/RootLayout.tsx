import { Outlet, useLocation } from "react-router-dom";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";

const RootLayout = () => {
  const location = useLocation();
  const isChatPage = location.pathname.includes("/chat"); // Adjust this based on your actual chat route

  return (
    <div className="w-full md:flex">
      {!isChatPage && <Topbar />} {/* Disable Topbar on the chat page */}
      <LeftSidebar />
      <section className="flex flex-1 h-full ">
        {" "}
        {/* Add bottom padding */}
        <Outlet />
      </section>
      {!isChatPage && <Bottombar />}
    </div>
  );
};

export default RootLayout;
