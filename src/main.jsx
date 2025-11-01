import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import History, { searchAction } from "./search_page.jsx";
import DictPage, { dictPageLoader } from "./dict_page.jsx";
import { EntryNotFound } from "./error_elements.jsx";
import Favorites, { favoritesLoader } from "./favs_page.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <div>idx</div>,
            },
            {
                path: "search",
                action: searchAction,
                element: <History />,
            },
            {
                path: "search/:query",
                loader: dictPageLoader,
                element: <DictPage />,
                errorElement: <EntryNotFound />,
            },
            {
                path: "favorites",
                loader: favoritesLoader,
                element: <Favorites />,
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
