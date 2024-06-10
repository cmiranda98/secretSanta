import React from "react";
import { createBrowserRouter } from "react-router-dom";
// PAGES
import Home from "../_containers/home";
// UTILITY
import ErrorBoundary from "../_containers/utility/errorBoundary";
import Error404 from "../_containers/utility/error404";

const router = createBrowserRouter([
    // 404
    {
        path: "*",
        element: <Error404 />,
    },
    // Home
    {
        path: "/",
        element: <ErrorBoundary><Home /></ErrorBoundary>,
    }
]);

export default router;
