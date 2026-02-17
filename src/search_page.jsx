import { useState } from "react";
import { redirect, Form, Link } from "react-router-dom";
import { loadHistory } from "./storage";

export async function searchAction({ request }) {
    const data = await request.formData();
    const query = data.get("query").trim().toLowerCase();
    if (!query) {
        return redirect("/search");
    }
    return redirect(`/search/${query}`);
}

function SearchHeader() {
    const [input, setInput] = useState("");

    return (
        <search>
            <Form method="post" action="/search">
                <input
                    name="query"
                    type="text"
                    autoComplete="off"
                    placeholder="consult the dictionary..."
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    autoFocus
                />
                <button type="submit" className={input && "active"}>
                    <i className="bx  bx-book-open"></i>
                </button>
            </Form>
        </search>
    );
}

//TODO: Display short message if history is empty
export default function SearchPage() {
    return (
        <div className="search-wrapper padded-wrapper">
            <SearchHeader />
            <div className="history">
                <h2>Recent queries</h2>
                <ul>
                    {loadHistory()
                        .toReversed()
                        .map((query) => {
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
