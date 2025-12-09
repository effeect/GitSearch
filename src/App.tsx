import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "bulma/css/bulma.min.css";

import {
  Router,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // Main Layout which contains the navbar/footer
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="repo/:owner/:repoName"
          element={<div>Repo Page</div>}
        ></Route>
      </Route>
    )
  );

  // Returning the router that is defined above
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
