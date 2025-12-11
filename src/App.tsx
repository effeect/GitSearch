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
import PRPage from "./pages/PRPage";
import IssuePage from "./pages/IssuePage";
import CodePage from "./pages/CodePage";
import CommitPage from "./pages/CommitPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Adding Font Answesome Icons
library.add(fas);

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      // Main Layout which contains the navbar/footer
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/:owner/:repo" element={<RepoPage />} />
        <Route path="/:owner/:repo/pr" element={<PRPage />} />
        <Route path="/:owner/:repo/code" element={<CodePage />} />
        <Route path="/:owner/:repo/commit" element={<CommitPage />} />
        <Route path="/:owner/:repo/issue" element={<IssuePage />} />
      </Route>
    )
  );

  // Returning the router that is defined above
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
