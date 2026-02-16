import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

import { loadFavorites, removeFavorite } from "./util";

export async function favoritesLoader() {
    return loadFavorites();
}

//TODO: Should display a short text if the favorites list is empty.
export default function FavoritesList() {
    const [favorites, setFavorites] = useState(useLoaderData());
    favorites.sort((obj1, obj2) => obj1.title.localeCompare(obj2.title));

    const favsList = favorites.map((obj) => {
        const title = obj.title;
        return (
            <li key={title}>
                <Link to={`/search/${title}`}>{title}</Link>
                <button
                    onClick={() => {
                        removeFavorite(title);
                        const nextFavorites = loadFavorites();
                        setFavorites(nextFavorites);
                    }}
                    aria-label="remove from favorites"
                >
                    <i className="bx  bxs-trash"></i>
                </button>
                <ul className="fav-sneak-peek">
                    {obj.sneakPeek.map((str, i) => (
                        <li key={i}>{str}</li>
                    ))}
                </ul>
            </li>
        );
    });

    return <ul className="favorites-list padded-wrapper">{favsList}</ul>;
}
