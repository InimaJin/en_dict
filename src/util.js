export function writeFavorites(favorites) {
    favorites = JSON.stringify(favorites);
    localStorage.setItem("favorites", favorites);
}

export function loadFavorites() {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(query, sneakPeek) {
    const favorites = loadFavorites();
    const alreadyFav = favorites.some((obj) => obj.title === query);
    if (!alreadyFav) {
        favorites.push({
            title: query,
            sneakPeek: sneakPeek,
        });
        writeFavorites(favorites);
    }
}

export function removeFavorite(query) {
    let favorites = loadFavorites();
    favorites = favorites.filter((obj) => obj.title !== query);
    writeFavorites(favorites);
}
