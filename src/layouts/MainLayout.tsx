// Main Layout which contains the Navbar/Footer and space for the main page content
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/atoms/Navbar/Navbar";
import Footer from "../components/atoms/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="container">
        <Navbar />
      </div>
      <div className="container is-widescreen">
        {/* Main page content will be rendered here */}
        <Outlet />
      </div>
      <div className="container">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
