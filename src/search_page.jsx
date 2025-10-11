import { redirect, Form, Link } from "react-router-dom";

export async function searchAction({ request }) {
    const data = await request.formData();
    const query = data.get("query").trim().toLowerCase();
    if (!query) {
        return redirect("/search");
    }
    return redirect(`/search/${query}`);
}

export function SearchHeader() {
    return (
        <header className="search-header">
            <search>
                <Form method="post" action="/search">
                    <button type="submit">
                        <i className="bx bx-search"></i>
                    </button>
                    <input
                        name="query"
                        type="search"
                        autoComplete="off"
                        placeholder="find something"
                    />
                </Form>
            </search>
        </header>
    );
}

export default function History() {
    let history = localStorage.getItem("history");
    history = history ? JSON.parse(history) : [];

    return (
        <div className="history">
            <h2>Recent queries</h2>
            <ul>
                {history.toReversed().map((query) => {
                    return (
                        <Link to={`/search/${query}`} key={query}>
                            <li>{query}</li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}
