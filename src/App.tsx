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

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import RepoPage from "./pages/RepoPage";

// Adding Font Answesome Icons
library.add(fas);

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // Main Layout which contains the navbar/footer
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/:owner/:repoName" element={<RepoPage />}></Route>
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
