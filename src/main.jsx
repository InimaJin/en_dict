import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App, { searchAction } from "./App.jsx";
import DictPage, { dictPageLoader } from "./dict_page.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        action: searchAction,
        element: <App />,
        children: [
            {
                index: true,
                element: <div>PLACEHOLDER INDEX</div>,
            },
            {
                path: "search/:query",
                loader: dictPageLoader,
                element: <DictPage />,
                errorElement: <div>OH NO!</div>
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
