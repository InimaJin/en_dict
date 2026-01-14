import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App, { Home } from "./App.jsx";
import SearchPage, { searchAction } from "./search_page.jsx";
import DictPage, { dictPageLoader } from "./dict_page.jsx";
import { EntryNotFound } from "./error_elements.jsx";
import FavoritesList, { favoritesLoader } from "./favs_page.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "search",
                action: searchAction,
                element: <SearchPage />,
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
                element: <FavoritesList />,
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
