import { Outlet, Link } from "react-router-dom";

export default function App() {
    return (
        <>
            <header>
                <h1>
                    <Link to={"/"}>en_dict</Link>
                </h1>
            </header>
            <Outlet />
        </>
    );
}
