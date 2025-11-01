import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

import { loadFavorites, writeFavorites } from "./util";

export async function favoritesLoader() {
    return loadFavorites();
}

export default function Favorites() {
    const [favorites, setFavorites] = useState(useLoaderData());
    favorites.sort();

    const favsList = favorites.map((f) => (
        <li key={f}>
            <Link to={`/search/${f}`}>{f}</Link>
            <button
                onClick={() => {
                    const nextFavorites = favorites.filter((fav) => fav !== f);
                    setFavorites(nextFavorites);
                    writeFavorites(nextFavorites);
                }}
            >
                <i className="bx  bxs-trash"></i>
            </button>
        </li>
    ));

    return <ul className="favorites-list">{favsList}</ul>;
}
