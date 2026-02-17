import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

import { loadFavorites, removeFavorite } from "./storage";

export async function favoritesLoader() {
    return loadFavorites();
}

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

    let element;
    if (favsList.length !== 0) {
        element = <ul className="favorites-list padded-wrapper">{favsList}</ul>;
    } else {
        element = <h1 className="no-favorites-msg">Saved entries will appear here.</h1>;
    }
    return element;
}
