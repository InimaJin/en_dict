export function loadFavorites() {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
}

export function writeFavorites(favorites) {
    favorites = JSON.stringify(favorites);
    localStorage.setItem("favorites", favorites);
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

export function loadHistory() {
    const history = localStorage.getItem("history");
    return JSON.parse(history) ?? [];
}

export function writeHistory(newHistoryArray) {
    const history = JSON.stringify(newHistoryArray);
    localStorage.setItem("history", history);
}
