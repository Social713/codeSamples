import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { useState } from "react";

const Layout = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const sidebarOpen = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} />
      <div className="flex">
        <Sidebar sidebar={sidebar} sidebarOpen={sidebarOpen} />
        <div
          onClick={sidebarOpen}
          className={
            sidebar ? 'w-full absolute backDrop h-full min-h-screen z-10 sm:hidden' : null
          }
        ></div>
        <div className="flex flex-row justify-center w-full">
          <div className="z-0 max-w-sm w-full md:max-w-full md:flex relative justify-center darkestColor">        
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
