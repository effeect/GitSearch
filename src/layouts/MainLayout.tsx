// Main Layout which contains the Navbar/Footer and space for the main page content
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div>Navbar Here</div>
      <div>
        {/* Main page content will be rendered here */}
        <Outlet />
      </div>
      <div>Footer Here</div>
    </>
  );
};

export default MainLayout;
