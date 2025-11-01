export function writeFavorites(favorites) {
    favorites = JSON.stringify(favorites);
    localStorage.setItem("favorites", favorites);
}

export function loadFavorites() {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(query) {
    const favorites = loadFavorites();
    if (!favorites.includes(query)) {
        favorites.push(query);
        writeFavorites(favorites);
    }
}

export function removeFavorite(query) {
    let favorites = loadFavorites();
    favorites = favorites.filter((f) => f !== query);
    writeFavorites(favorites);
}
