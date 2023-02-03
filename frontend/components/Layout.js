import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, theme, handleThemeToggle }) => {
  
  return (
    <div className={ (theme && 'dark')} > 
    {/* dark:bg-[#131052]  */}
    <div className=" bg-white dark:bg-zinc-300 -serif flex flex-col min-h-screen">
      <Navbar theme={theme} handleThemeToggle={handleThemeToggle} />
      <main className="flex-1" theme={theme} >{children}</main>
      <Footer />
    </div>

    </div>
  );
};

export default Layout;
