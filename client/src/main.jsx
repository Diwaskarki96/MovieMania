import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from "./pages/HomePage.jsx";
import { guestRoutes } from "./routes/GuestRoutes.jsx";
import { mainRoutes } from "./routes/MainRoutes.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const queryClient = new QueryClient();

const router = createBrowserRouter([...guestRoutes, ...mainRoutes]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
