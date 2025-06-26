import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./global/store.js";
import "./index.css";
import "./../styles/styles.css";
import "./../Sass/main.scss";
import "./../Sass/main.css";
import { router } from "./routes/router";
import "./i18n";
import { LanguageProvider } from "./context/LanguageContext";
import {  QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../config/reactQuery.js";
import { Toaster } from "sonner";




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </LanguageProvider>
    </Provider>
  </StrictMode>
);
