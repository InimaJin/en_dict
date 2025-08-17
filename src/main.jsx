import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import MainSearch, { searchAction } from "./search.jsx";
import DictPage, { dictPageLoader } from "./dict_page.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                action: searchAction,
                element: <MainSearch />,
            },
            {
                path: "search/:query",
                loader: dictPageLoader,
                element: <DictPage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </StrictMode>
);
