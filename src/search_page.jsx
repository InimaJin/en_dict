import { useState, useRef, useEffect } from "react";
import { redirect, Form, Link } from "react-router-dom";

export async function searchAction({ request }) {
    const data = await request.formData();
    const query = data.get("query").trim().toLowerCase();
    if (!query) {
        return redirect("/search");
    }
    return redirect(`/search/${query}`);
}

function SearchHeader({ inputRef }) {
    const [input, setInput] = useState("");

    return (
        <search>
            <Form method="post" action="/search">
                <input
                    name="query"
                    type="text"
                    autoComplete="off"
                    placeholder="find something"
                    ref={inputRef}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <button type="submit" className={input && "active"}>
                    <i className="bx  bx-book-open"></i>
                </button>
            </Form>
        </search>
    );
}

export default function SearchPage() {
    let history = localStorage.getItem("history");
    history = history ? JSON.parse(history) : [];

    const searchInputRef = useRef(null);
    useEffect(() => {
        searchInputRef.current.focus();
    }, []);

    return (
        <div className="search-wrapper">
            <SearchHeader inputRef={searchInputRef} />
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
        </div>
    );
}
