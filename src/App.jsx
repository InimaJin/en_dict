import { Link, Outlet, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    const NAV_PATHS = {
        root: "/",
        search: "/search",
        favorites: "/favorites",
    };

    function activeLinkClass(link) {
        return location.pathname === link ? "active" : "";
    }

    return (
        <header className="main-header">
            <div>
                <Link
                    to={NAV_PATHS.root}
                    aria-label="home"
                    className={activeLinkClass(NAV_PATHS.root)}
                >
                    <i className="bx bx-home"></i>
                </Link>
                <Link
                    to={NAV_PATHS.search}
                    aria-label="search"
                    className={activeLinkClass(NAV_PATHS.search)}
                >
                    <i className="bx bx-search"></i>
                </Link>
            </div>
            <Link
                to={NAV_PATHS.favorites}
                aria-label="favorites"
                className={activeLinkClass(NAV_PATHS.favorites)}
            >
                <i className="bx  bx-bookmarks"></i>
            </Link>
        </header>
    );
}

export default function App() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
