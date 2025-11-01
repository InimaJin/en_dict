import { Link, Outlet, useLocation } from "react-router-dom";
import { SearchHeader } from "./search_page.jsx";

function Header() {
    const location = useLocation();
    if (location.pathname === "/search") {
        return <SearchHeader />;
    }

    return (
        <header className="main-header">
            <div>
                <Link to={"/"} aria-label="home">
                    <i className="bx bx-home"></i>
                </Link>
                <Link to={"/search"} aria-label="search">
                    <i className="bx bx-search"></i>
                </Link>
            </div>
            <Link to={"/favorites"} aria-label="favorites">
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
