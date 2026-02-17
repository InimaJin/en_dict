import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { loadDisplayModeIdx, writeDisplayModeIdx } from "./storage";

function Header({ displayModeClass }) {
    const location = useLocation();

    const NAV_PATHS = {
        root: "/",
        search: "/search",
        favorites: "/favorites",
        settings: "/settings",
    };

    function activeLinkClass(link) {
        return location.pathname === link ? "active" : "";
    }

    return (
        <header className={displayModeClass}>
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
                <Link
                    to={NAV_PATHS.favorites}
                    aria-label="favorites"
                    className={activeLinkClass(NAV_PATHS.favorites)}
                >
                    <i className="bx  bx-bookmarks"></i>
                </Link>
                <Link
                    to={"settings"}
                    aria-label="settings"
                    className={activeLinkClass(NAV_PATHS.settings)}
                >
                    <i className="bx bx-cog" />
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
    const modes = ["light", "dark", "auto"];
    const [displayModeIdx, setDisplayModeIdx] = useState(loadDisplayModeIdx());
    const currentDisplayMode = modes[displayModeIdx];
    const [displayModeClass, setDisplayModeClass] =
        useState(currentDisplayMode);

    function toggleNextDisplayMode() {
        const nextIdx = (displayModeIdx + 1) % modes.length;
        writeDisplayModeIdx(nextIdx);
        setDisplayModeIdx(nextIdx);
    }

    useEffect(() => {
        const darkModeMql =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)");
        if (currentDisplayMode === "auto") {
            setDisplayModeClass(darkModeMql.matches ? "dark" : "");
        } else {
            setDisplayModeClass(currentDisplayMode);
        }

        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (event) => {
                setDisplayModeClass(event.matches ? "dark" : "");
            });
    }, [currentDisplayMode]);

    return (
        <>
            <Header displayModeClass={displayModeClass} />
            <div className={`content-window ${displayModeClass}`}>
                <Outlet
                    context={{ currentDisplayMode, toggleNextDisplayMode }}
                />
            </div>
        </>
    );
}
