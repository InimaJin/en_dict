import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function Header({ currentDisplayMode, toggleNextDisplayMode }) {
    const location = useLocation();

    const NAV_PATHS = {
        root: "/",
        search: "/search",
        favorites: "/favorites",
    };

    function activeLinkClass(link) {
        return location.pathname === link ? "active" : "";
    }

    let displayModeClass;
    if (currentDisplayMode == "light") {
        displayModeClass = "sun";
    } else {
        displayModeClass = "moon-stars";
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
            <div>
                <button
                    aria-label="toggle display mode"
                    onClick={toggleNextDisplayMode}
                >
                    <i className={`bx bx-${displayModeClass}`} />
                </button>
                <Link
                    to={NAV_PATHS.favorites}
                    aria-label="favorites"
                    className={activeLinkClass(NAV_PATHS.favorites)}
                >
                    <i className="bx  bx-bookmarks"></i>
                </Link>
            </div>
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
    const modes = ["light", "dark"];
    const [displayModeIdx, setDisplayModeIdx] = useState(0);
    const currentDisplayMode = modes[displayModeIdx];

    function toggleNextDisplayMode() {
        const nextIdx = (displayModeIdx + 1) % modes.length;
        setDisplayModeIdx(nextIdx);
    }

    return (
        <div className={`${currentDisplayMode}`}>
            <Header
                currentDisplayMode={currentDisplayMode}
                toggleNextDisplayMode={toggleNextDisplayMode}
            />
            <div className="content-window">
                <Outlet />
            </div>
        </div>
    );
}
