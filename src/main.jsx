import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App, { appLoader, Home } from "./App.jsx";
import SearchPage, { searchAction, searchPageLoader } from "./search_page.jsx";
import DictPage, { dictPageLoader } from "./dict_page.jsx";
import { EntryNotFound } from "./error_elements.jsx";
import FavoritesList, { favoritesLoader } from "./favs_page.jsx";
import SettingsPage from "./settings_page.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        loader: appLoader,
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "search",
                loader: searchPageLoader,
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
            {
                path: "settings",
                element: <SettingsPage />,
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
