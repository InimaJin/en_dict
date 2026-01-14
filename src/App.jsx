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
        <header>
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

export function Home() {
    return (
        <>
            <div className="home-wrapper">
                <div>
                    <i className="bx bx-reading"></i>
                    <div>
                        <h1>Welcome!</h1>
                        <p>/ˈwɛlkəm/</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function App() {
    return (
        <>
            <Header />
            <div className="content-window">
                <Outlet />
            </div>
        </>
    );
}
