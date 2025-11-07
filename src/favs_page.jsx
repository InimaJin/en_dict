import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

import { loadFavorites, writeFavorites } from "./util";

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
                        const nextFavorites = favorites.filter(
                            (obj) => obj.title !== title
                        );
                        setFavorites(nextFavorites);
                        writeFavorites(nextFavorites);
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

    return <ul className="favorites-list">{favsList}</ul>;
}
